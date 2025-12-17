import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
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
import { RequestCache } from './request-cache';
import { CacheInterceptor } from './cache.interceptor';

@NgModule({ declarations: [
        ToolsComponent,
        SeriesSidebarComponent,
        DashboardViewComponent,
        GeoSelectorComponent,
        HighstockComponent,
        FreqSelectorComponent,
        MeasurementSelectorComponent,
        SmoothingSelectorComponent
    ],
    exports: [ToolsComponent, DashboardViewComponent], imports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HighchartsChartModule], providers: [
        RequestCache,
        { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class ToolsModule { }
