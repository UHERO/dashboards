import { Component, Input, Inject, OnChanges, ViewEncapsulation } from '@angular/core';
import * as Highstock from 'highcharts/highstock';
import { HelperService } from '../helper.service';
import { Frequency, Geography, Smoothing } from '../tools.models';
import subYears from 'date-fns/subYears';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';
import offlineExport from 'highcharts/modules/offline-exporting';

@Component({
  selector: 'lib-highstock',
  templateUrl: './highstock.component.html',
  styleUrls: ['./highstock.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HighstockComponent implements OnChanges {
  @Input() measurementName: string;
  @Input() currentCategory;
  @Input() selectedGeo: Geography;
  @Input() selectedFreq: Frequency;
  @Input() smoothing: Smoothing;
  Highcharts = Highstock;
  chartConstructor: string = 'stockChart';
  chartOptions: Highcharts.Options = {};
  updateChart: boolean = false;
  chartObject;
  loading = true;
  showChart = false;
  displayYoyChart: boolean;
  yoyChartOptions: Highcharts.Options = {};
  metadata;

  constructor(private helperService: HelperService, @Inject('logo') private logo) {
    // workaround to include exporting module in production build
    exporting(this.Highcharts);
    exportData(this.Highcharts);
    offlineExport(this.Highcharts);    
  }

  ngOnChanges() {
    this.helperService
      .getSeriesData(`${this.measurementName}@${this.selectedGeo.handle}.${this.selectedFreq.handle}`)
      .then((data) => {
        this.loading = true;
        this.metadata = {
          source: data.series.sourceDescription,
          link: data.series.sourceLink
        };
        const chartSeries = [];
        const yoyChartSeries = [];
        const chartLevelData = this.formatLevelData(data, false);
        chartSeries.push(this.formatChartSeriesObj(chartLevelData.dates, data.series.title, data.observations.observationStart, chartLevelData.levelData, this.currentCategory.chartType));
        let laggedData, yoyData;
        if (this.smoothing.lag) {
          laggedData = this.formatLevelData(data, true, this.smoothing.lag);
          chartSeries.push(this.formatChartSeriesObj(laggedData.dates, `${this.smoothing.lag} Year Lag`, data.observations.observationStart, laggedData.levelData, this.currentCategory.chartType));
        }
        if (this.smoothing.yoy) {
          yoyData = chartLevelData.dates.map((date, index) => {
            const currDate = new Date(this.dateStrReplaceHyphens(date));
            const prevYearDate = subYears(new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate()), 1).toISOString().substr(0, 10);
            const prevYearDateIndex = this.helperService.binarySearch(chartLevelData.dates, prevYearDate);
            if (prevYearDateIndex > -1) {
              return (chartLevelData.levelData[index] - chartLevelData.levelData[prevYearDateIndex]) / chartLevelData.levelData[prevYearDateIndex];
            }
          });
          yoyChartSeries.push(this.formatChartSeriesObj(chartLevelData.dates, data.series.title, data.observations.observationStart, yoyData, 'area'));
        }
        this.yoyChartOptions.series = yoyChartSeries;
        this.chartOptions.series = chartSeries;
        this.defineChartObjSettings(this.chartOptions, data.series.unitsLabel, `${data.series.title} ${this.selectedGeo.name}`);
        if (this.smoothing.yoy) {
          this.defineChartObjSettings(this.yoyChartOptions, `% Change in ${data.series.title}`, `Percent Change in ${data.series.title}, Year-Over-Year`);
          this.displayYoyChart = true;
        }
        this.showChart = true;
        this.updateChart = true;
        this.loading = false;
      });
  }

  defineChartObjSettings = (chartObj: Highcharts.Options, units: string, title: string) => {
    const logo = this.logo;
    const freq = this.selectedFreq.handle;
    const formatTooltip = (points, x, dec, frequency) => this.formatTooltip(points, x, dec, frequency);
    chartObj.chart = {
      className: 'series-chart',
      styledMode: true,
      events: {
        load() {
          if (logo.analyticsLogoSrc) {
            this.renderer.image(logo.analyticsLogoSrc, 0, 0, 141 / 1.75, 68 / 1.75).add();
          }
        }
      }
    }
    chartObj.credits = {
      enabled: false
    };
    chartObj.title = {
      text: title
    };
    chartObj.exporting = {
      allowHTML: true,
      buttons: {
        contextButton: { enabled: false },
        exportButton: {
          menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG', 'downloadCSV'],
          text: 'Download',
          titleKey: 'exportKey',
        }
      },
      csv: {
        dateFormat: '%Y-%m-%d',
      },
      chartOptions: {
        chart: {
          styledMode: true,
          spacingBottom: 40
        },
        navigator: {
          enabled: false
        },
        scrollbar: {
          enabled: false
        },
        rangeSelector: {
          enabled: false
        },
        credits: {
          enabled: true,
          position: {
            align: 'left',
            verticalAlign: 'top',
            x: 2,
            y: 50,
          },
          text: 'data.uhero.hawaii.edu/high-frequency-dashboard',
        }
      }
    };
    chartObj.xAxis = {
      events: {
        setExtremes: function(e) {
          const thisChart = this.chart;
          if (e.trigger !== 'syncExtremes') {
            Highstock.charts.forEach((chart) => {
              if (
                chart &&
                chart !== thisChart &&
                chart.options.chart.className === thisChart.options.chart.className
              ) {
                if (chart.xAxis[0].setExtremes) {
                  chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {
                    trigger: 'syncExtremes'
                  }); 
                }
              }
            });
          }
        }
      }
    }
    chartObj.yAxis = [{
      opposite: false,
      title: {
        text: units
      }
    }];
    chartObj.tooltip = {
      borderWidth: 0,
      shadow: false,
      followPointer: true,
      formatter(args) {
        return formatTooltip(this.points, this.x, 2, freq);
      }
    };
  }

  dateStrReplaceHyphens = (date: string) => date.replace(/-/g, '/');

  getPointInterval = (freq: string) => {
    const freqIntervals = {
      'A': 1,
      'S': 6,
      'Q': 3,
      'M': 1,
      'W': 7,
      'D': 1
    };
    return freqIntervals[freq];
  }

  getPointIntervalUnit = (freq: string) => {
    const intUnit = {
      'A': 'year',
      'S': 'month',
      'Q': 'month',
      'M': 'month',
      'W': 'day',
      'D': 'day'
    };
    return intUnit[freq];
  }

  findDateIndex = (categoryDate: string, start: boolean, dates: Array<string>) => {
    let dateIndex;
    if (categoryDate) {
      dateIndex = this.helperService.binarySearch(dates, categoryDate);
    }
    return dateIndex > -1 ? dateIndex : start ? 0 : dates.length - 1;
  }

  formatLevelData = (data: any, lag: boolean, lagYear?: number) => {
    const obsStart = data.observations.observationStart;
    const obsEnd = data.observations.observationEnd;
    const start = new Date(this.dateStrReplaceHyphens(obsStart));
    const end = new Date(this.dateStrReplaceHyphens(obsEnd));
    const dates = this.helperService.getArrayOfSeriesDates(start, end, this.selectedFreq.handle);
    const lvl = data.observations.transformationResults.find(t => t.transformation === 'lvl');
    const values = dates.map((date) => {
      const dateExistsIndex = this.helperService.binarySearch(lvl.dates, date);
      return dateExistsIndex > -1 ? +lvl.values[dateExistsIndex] : null;
    });
    let levelData: Array<number>;
    if (!lag) {
      levelData = this.smoothing.value === 'rawValues' ? values : this.helperService.calculateMovingAvg(values, +this.smoothing.value);
    }
    if (lag && lagYear) {
      levelData = this.smoothing.value === 'rawValues' ? this.helperService.getLaggedData(lvl.dates, values, lagYear) : this.helperService.getLaggedData(lvl.dates, this.helperService.calculateMovingAvg(values, +this.smoothing.value), lagYear);
    }
    return { levelData, dates };
  }

  formatChartSeriesObj = (dates: Array<string>, title: string, obsStart: string, data: Array<number>, chartType: string) => {
    const categoryRangeStart = this.currentCategory.range.start;
    const startDate = categoryRangeStart ? this.dateStrReplaceHyphens(categoryRangeStart) : this.dateStrReplaceHyphens(obsStart);
    const categoryRangeEnd = this.currentCategory.range.end;
    const startDateIndex = this.findDateIndex(categoryRangeStart, true, dates);
    const endDateIndex = this.findDateIndex(categoryRangeEnd, false, dates);
    return {
      type: chartType,
      name: title,
      data: data.slice(startDateIndex, endDateIndex),
      pointStart: Date.parse(startDate),
      pointInterval: this.getPointInterval(this.selectedFreq.handle),
      pointIntervalUnit: this.getPointIntervalUnit(this.selectedFreq.handle),
      showInNavigator: true,
      dataGrouping: {
        enabled: false
      }
    }
  }

  formatTooltip = (points, x, decimals, freq) => {
    const getFreqLabel = (frequency, date) => this.getTooltipFreqLabel(frequency, date);
    let s = `<b>${getFreqLabel(freq, x)}</b>`;
    points.forEach((point) => {
      if (!point.series.name.includes('YTD')) {
        const displayValue = Highstock.numberFormat(point.y, decimals, '.', ',');
        const formattedValue = displayValue === '-0.00' ? '0.00' : displayValue;
        const seriesColor = `<br><span class='series-${point.colorIndex}'>\u25CF</span>`;
        const seriesNameValue = point.series.name + ': ' + formattedValue;
        const label = seriesColor + seriesNameValue;
        s += label;
      }
    });
    return s;
  }

  getTooltipFreqLabel = (frequency: string, date) => {
    const year = Highstock.dateFormat('%Y', date);
    const month = Highstock.dateFormat('%b', date);
    const day = Highstock.dateFormat('%d', date);
    const dateFmt = {
      A: year,
      Q: `${year}${this.getQuarterLabel(month)}`,
      M: `${Highstock.dateFormat('%b', date)} ${year}`,
      S: `${Highstock.dateFormat('%b', date)} ${year}`
    }
    return dateFmt[frequency] || `${month} ${day}, ${year}`;
  }

  getQuarterLabel = (month: string) => {
    const quarters = {
      Jan: ' Q1',
      Apr: ' Q2',
      Jul: ' Q3',
      Oct: ' Q4' 
    }
    return quarters[month] || '';
  }
}
