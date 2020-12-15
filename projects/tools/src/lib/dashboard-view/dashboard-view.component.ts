import { Component, OnDestroy, OnInit } from '@angular/core';
import { HelperService } from '../helper.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Frequency, Geography, Smoothing, Measurement } from '../tools.models';
import * as Highstock from 'highcharts/highstock';

@Component({
  selector: 'lib-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
})
export class DashboardViewComponent implements OnDestroy {
  dashboardData: Array<any>;
  navSubscription: Subscription;
  geoSub: Subscription;
  freqSub: Subscription;
  measurementSub: Subscription;
  smoothingSub: Subscription;
  selectedMeasurements: Measurement;
  selectedSmoothing: Smoothing;
  currentCategory;
  selectedGeo: Geography;
  selectedFreq: Frequency;
  loaded = false;

  constructor(
    private helperService: HelperService,
    private router: Router,
  ) {
    this.navSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        const param = e.url.split('=')[1];
        this.dashboardData = this.helperService.getDashboardData();
        this.helperService.setSelectedCategory(param);
        this.currentCategory = this.helperService.getSelectedCategory();
        this.displayData();
      }
    });
    this.geoSub = helperService.currentGeo.subscribe((geo) => {
      this.selectedGeo = geo;
    });
    this.freqSub = helperService.currentFreq.subscribe((freq) => {
      this.selectedFreq = freq;
    });
    this.measurementSub = helperService.currentMeasurement.subscribe((measurements) => {
      this.selectedMeasurements = measurements;
    });
    this.smoothingSub = helperService.currentSmoothing.subscribe((smoothing) => {
      this.selectedSmoothing = smoothing;
    });
  }

  displayData() {
    this.dashboardData = this.helperService.getDashboardData();
    this.helperService.getDefaultGeo();
    this.helperService.getDefaultFreq();
    this.helperService.getDefaultSmoothing();
    this.helperService.getDefaultMeasurement();
  }

  ngOnDestroy() {
    if (this.navSubscription) {
      this.navSubscription.unsubscribe();
    }
    this.geoSub.unsubscribe();
    this.freqSub.unsubscribe();
    this.measurementSub.unsubscribe();
    this.smoothingSub.unsubscribe();
  }

  toggleSidebar(event) {
    setTimeout(() => {
      Highstock.charts.forEach((chart) => {
        if (chart) {
          chart.reflow();
        }
      });
    }, 1000);
  }
}
