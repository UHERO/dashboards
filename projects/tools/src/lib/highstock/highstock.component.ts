import { Component, Input, OnChanges } from '@angular/core';
import * as Highstock from 'highcharts/highstock';
import { HelperService } from '../helper.service';
import { Frequency, Geography, Smoothing } from '../tools.models';

@Component({
  selector: 'lib-highstock',
  templateUrl: './highstock.component.html',
  styleUrls: ['./highstock.component.scss'],
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

  constructor(private helperService: HelperService) {}

  ngOnChanges() {
    this.helperService
      .getSeriesData(`${this.measurementName}@${this.selectedGeo.handle}.${this.selectedFreq.handle}`)
      .then((data) => {
        const chartSeries = [];
        chartSeries.push(this.formatSeriesDataForChart(data, false));
        if (this.smoothing.lag) {
          chartSeries.push(this.formatSeriesDataForChart(data, true, this.smoothing.lag));
        }
        this.chartOptions.series = chartSeries;
        this.chartOptions.title = {
          text: `${data.series.title}<br />${this.selectedGeo.name}`,
          useHTML: true
        }
        this.chartOptions.tooltip = {
          valueDecimals: 2
        };
        this.chartOptions.xAxis = {
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
        this.showChart = true;
        this.updateChart = true;
        this.loading = false;
      });
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
    }
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
    }
    return intUnit[freq];
  }

  formatSeriesDataForChart = (data: any, lag: boolean, lagYear?: number) => {
    const obsStart = data.observations.observationStart;
    const obsEnd = data.observations.observationEnd;
    const start = new Date(this.dateStrReplaceHyphens(obsStart));
    const end = new Date(this.dateStrReplaceHyphens(obsEnd));
    const dates = this.helperService.getArrayOfSeriesDates(start, end, this.selectedFreq.handle);
    const values = dates.map((date) => {
      const dateExistsIndex = this.helperService.binarySearch(data.observations.transformationResults[0].dates, date);
      return dateExistsIndex > -1 ? +data.observations.transformationResults[0].values[dateExistsIndex] : null;
    });
    const categoryRangeStart = this.currentCategory.range.start;
    const startDate = categoryRangeStart ? this.dateStrReplaceHyphens(categoryRangeStart) : this.dateStrReplaceHyphens(obsStart);
    const categoryRangeEnd = this.currentCategory.range.end;
    const startDateIndex = categoryRangeStart ? this.helperService.binarySearch(data.observations.transformationResults[0].dates, categoryRangeStart) : 0;
    const endDateIndex = categoryRangeEnd ? this.helperService.binarySearch(data.observations.transformationResults[0].dates, categoryRangeEnd) : dates.length - 1;
    let chartData: Array<number>;
    if (!lag) {
      chartData = this.smoothing.value === 'rawValues' ? values : this.helperService.calculateMovingAvg(values, +this.smoothing.value);
    }
    if (lag && lagYear) {
      chartData = this.helperService.getLaggedData(data.observations.transformationResults[0].dates, values, lagYear);
    }
    return {
      type: this.currentCategory.chartType,
      name: data.series.title,
      data: chartData.slice(startDateIndex, endDateIndex),
      pointStart: Date.parse(startDate),
      pointInterval: this.getPointInterval(this.selectedFreq.handle),
      pointIntervalUnit: this.getPointIntervalUnit(this.selectedFreq.handle),
      showInNavigator: true,
      dataGrouping: {
        enabled: false
      }
    }
  }
}
