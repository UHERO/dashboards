import { Component, OnInit } from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'lib-series-sidebar',
  templateUrl: './series-sidebar.component.html',
  styleUrls: ['./series-sidebar.component.scss'],
})
export class SeriesSidebarComponent implements OnInit {

  constructor(
    @Inject('dashboardSeries') public dashboardSeries: Array<any>
  ) {}

  ngOnInit(): void {
    console.log(this.dashboardSeries)
  }

  updateSelectedMeasurement(measurement, dashboardSeries) {
    const prevSelected = dashboardSeries.find(m => m.selected);
    prevSelected.selected = !prevSelected;
    const currSelected = dashboardSeries.find(m => m.name === measurement.name);
    currSelected.selected = !currSelected.selected;
    console.log('update', dashboardSeries)
  }
}
