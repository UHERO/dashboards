import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { ToolsComponent } from './tools.component';
import { SeriesSidebarComponent } from './series-sidebar/series-sidebar.component';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { GeoSelectorComponent } from './geo-selector/geo-selector.component';
import { HighstockComponent } from './highstock/highstock.component';
import { FreqSelectorComponent } from './freq-selector/freq-selector.component';
import { MeasurementSelectorComponent } from './measurement-selector/measurement-selector.component';
import { SmoothingSelectorComponent } from './smoothing-selector/smoothing-selector.component';



@NgModule({
  declarations: [ToolsComponent, SeriesSidebarComponent, DashboardViewComponent, GeoSelectorComponent, HighstockComponent, FreqSelectorComponent, MeasurementSelectorComponent, SmoothingSelectorComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HighchartsChartModule
  ],
  exports: [ToolsComponent, DashboardViewComponent]
})
export class ToolsModule { }
