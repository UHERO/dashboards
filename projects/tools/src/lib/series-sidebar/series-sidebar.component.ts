import { Component, OnInit, Input, Injectable, Inject, Output } from '@angular/core';
import { EventEmitter } from 'protractor';
import { ApiService } from '../api.service';
import { HelperService } from '../helper.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lib-series-sidebar',
  templateUrl: './series-sidebar.component.html',
  styleUrls: ['./series-sidebar.component.scss'],
})
export class SeriesSidebarComponent implements OnInit {
  @Input() dashboardData: Array<any>;
  //@Output() updateDashboardView = new EventEmitter();
  currentGeo;

  constructor(
    private helperService: HelperService,
    private activatedRoute: ActivatedRoute,
    private router: Router
) {}

  ngOnInit(): void {
    console.log(this.dashboardData);
  }

  updateSelectedCategory(category) {
    this.helperService.updateSelectedCategory(category);
    //this.updateDashboardView.emit()
    this.router.navigate([`/`], { queryParams: {cat: category.name.replace(/\s/g, '')}})
  }
}
