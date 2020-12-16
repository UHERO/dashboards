import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from './api.service';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import eachMonthOfInterval from 'date-fns/eachMonthOfInterval';
import eachYearOfInterval from 'date-fns/eachYearOfInterval';
import subYears from 'date-fns/subYears';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  dashboardCategories;  
  currentGeoChange: BehaviorSubject<any> = new BehaviorSubject(null);
  currentGeo = this.currentGeoChange.asObservable();
  currentFreqChange: BehaviorSubject<any> = new BehaviorSubject(null);
  currentFreq = this.currentFreqChange.asObservable();
  currentMeasurementChange: BehaviorSubject<any> = new BehaviorSubject(null);
  currentMeasurement = this.currentMeasurementChange.asObservable();
  currentSmoothingChange: BehaviorSubject<any> = new BehaviorSubject(null);
  currentSmoothing = this.currentSmoothingChange.asObservable();
  highstockDataChange: BehaviorSubject<any> = new BehaviorSubject([]);
  highstockData = this.highstockDataChange.asObservable();
  //seriesCache = {};

  constructor(
    @Inject('dashboardData') public dashboardData: Array<any>,
    private apiService: ApiService
  ) {}

  getDashboardData = () => {
    this.dashboardCategories = this.dashboardData;
    return this.dashboardCategories;
  }

  setSelectedCategory = (urlParam: string) => {
    const categoryExists = this.dashboardCategories.find(cat => cat.name.replace(/\s/g, '') === urlParam);
    if (categoryExists) {
      categoryExists.selected = true;
    } else {
      this.dashboardCategories[0].selected = true;
    }
  }

  getSelectedCategory = () => this.dashboardCategories.find(cat => cat.selected);

  getDefaultGeo = () => {
    const selectedCategory = this.getSelectedCategory();
    if (selectedCategory) {
      this.updateCurrentGeography(selectedCategory.geographies[0])
    }
  }

  getDefaultFreq = () => {
    const selectedCategory = this.getSelectedCategory();
    if (selectedCategory) {
      this.updateCurrentFrequency(selectedCategory.frequencies[0]);
    }
  }

  getDefaultMeasurement = () => {
    const selectedCategory = this.getSelectedCategory();
    if (selectedCategory) {
      if (selectedCategory.measurements.options) {
        this.updateCurrentMeasurement(selectedCategory.measurements.options[0]);
      } else {
        this.updateCurrentMeasurement(selectedCategory.measurements);
      }
    }
  }

  getDefaultSmoothing = () => {
    const selectedCategory = this.getSelectedCategory();
    if (selectedCategory) {
      this.updateCurrentSmoothing(selectedCategory.smoothing[0]);
    }
  }

  updateSelectedCategory = (category) => {
    const prevSelected = this.getSelectedCategory();
    prevSelected.selected = !prevSelected;
    const currSelected = this.dashboardCategories.find(cat => cat.name === category.name);
    currSelected.selected = !currSelected.selected;
  }

  updateHighstockData = data => this.highstockDataChange.next(data);

  updateCurrentGeography = (newGeo) => {
    this.currentGeoChange.next(newGeo);
    return newGeo;
  }

  updateCurrentFrequency = (newFreq) => {
    this.currentFreqChange.next(newFreq);
    return newFreq;
  }

  updateCurrentMeasurement = (newMeasurement) => {
    this.currentMeasurementChange.next(newMeasurement);
    return newMeasurement;
  }

  updateCurrentSmoothing = (newSmoothing) => {
    this.currentSmoothingChange.next(newSmoothing);
    return newSmoothing;
  }

  getSeriesData = (name: string) => this.apiService.fetchSeries(name, false).toPromise();

  binarySearch = (valueList, date) => {
    let start = 0;
    let end = valueList.length - 1;
    let middle = Math.floor((start + end) / 2);
    while (valueList[middle] !== date && start < end) {
      if (date < valueList[middle]) {
        end = middle - 1;
      } else {
        start = middle + 1;
      }
      middle = Math.floor((start + end) / 2);
    }
    return (valueList[middle] !== date) ? -1 : middle;
  }

  getArrayOfSeriesDates = (start: Date, end: Date, frequency: string) => {
    const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    const dates = {
      D: eachDayOfInterval({
        start: startDate,
        end: endDate
      }),
      W: eachDayOfInterval({
        start: startDate,
        end: endDate
      },
        {step: 7}
      ),
      M: eachMonthOfInterval({
        start: startDate,
        end: endDate
      }),
      A: eachYearOfInterval({
        start: startDate,
        end: endDate
      })
    };
    return dates[frequency].map(d => d.toISOString().substr(0, 10));
  }

  calculateAverage = (values: Array<number>) => values.reduce((acc, value) => acc + value, 0) / values.length;

  calculateMovingAvg = (values: Array<any>, days: number) => {
    const mvgAvg = new Array(days - 1).fill(null);
    if (days > values.length) {
      return [this.calculateAverage(values)];
    }
    for (let i = 0; i + days - 1 < values.length; i++) {
      mvgAvg.push(this.calculateAverage(values.slice(i, i + days))); 
    }
    return mvgAvg;
  }

  getLaggedData = (dates: Array<string>, values: Array<number>, yearLag: number) => {
    return dates.map((date) => {
      const formattedDate = new Date(date.replace(/-/g, '/'));
      const currentDate = new Date(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate())
      const laggedDate = subYears(currentDate, yearLag);
      const laggedDateExistsIndex = this.binarySearch(dates, laggedDate.toISOString().substr(0, 10));
      return laggedDateExistsIndex ? values[laggedDateExistsIndex] : null;
    })
  }
}
