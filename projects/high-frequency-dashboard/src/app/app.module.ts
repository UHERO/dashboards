import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ToolsModule } from 'tools';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ToolsModule],
  providers: [
    {
      provide: 'environment',
      useValue: environment,
    },
    {
      provide: 'dashboardData',
      useValue:
        [
          {
            name: 'COVID-19 Cases',
            chartType: 'line',
            measurements: {
              dropdown: false,
              baseNames: ['COVCASESNS', 'NEWCOVCASESNS'],
            },
            frequencies: [{ name: 'Daily', handle: 'D' }],
            geographies: [
              { handle: 'HI', name: 'State of Hawaiʻi' },
              { handle: 'HAW', name: 'Hawaiʻi County' },
              { handle: 'HON', name: 'Honolulu County' },
              { handle: 'KAU', name: 'Kauai County' },
              { handle: 'MAU', name: 'Maui County' },
            ],
            range: { start: null, end: null },
            smoothing: [
              { name: 'Daily', value: 'rawValues', yoy: false },
            ]
          },
          {
            name: 'Unemployment Claims',
            chartType: 'line',
            measurements: {
              dropdown: false,
              baseNames: ['UICININS', 'UICNS']
            },
            frequencies: [{ name: 'Weekly', handle: 'W' }],
            geographies: [
              { handle: 'HI', name: 'State of Hawaiʻi' },
              { handle: 'HAW', name: 'Hawaiʻi County' },
              { handle: 'HON', name: 'Honolulu County' },
              { handle: 'KAU', name: 'Kauai County' },
              { handle: 'MAU', name: 'Maui County' },
            ],
            range: { start: null, end: null },
            smoothing: [
              { name: 'Weekly', value: 'rawValues', yoy: false },
            ]
          },
          {
            name: 'Bankruptcies',
            chartType: 'line',
            measurements: {
              dropdown: false,
              baseNames: ['BNKRUPTTL']
            },
            frequencies: [{ name: 'Daily', handle: 'D' }],
            geographies: [{ handle: 'HI', name: 'State of Hawaiʻi' }],
            range: { start: '2007-01-01', end: null },
            smoothing: [
              { name: '90 Day Moving Average', value: '90', yoy: true },
              { name: '30 Day Moving Average', value: '30', yoy: true },
              { name: '7 Day Moving Average', value: '7', yoy: true },
              { name: 'Daily', value: 'rawValues', yoy: false },
            ]
          },
          {
            name: 'Mortgage Payments',
            chartType: 'line',
            measurements: {
              dropdown: false,
              baseNames: ['NONCURR']
            },
            frequencies: [{ name: 'Monthly', handle: 'M' }],
            geographies: [{ handle: 'HI', name: 'State of Hawaiʻi' }],
            range: { start: null, end: null },
            smoothing: [
              { name: 'Monthly', value: 'rawValues', yoy: false },
            ]
          },
          /* {
            name: 'Job Postings',
            ids: [29759],
            frequencies: ['W'],
            geographies: [{ handle: 'HI', name: 'State' }]
          }, */
          {
            name: 'Passenger Count',
            chartType: 'line',
            measurements: {
              dropdown: true,
              options: [
                { name: 'Total', baseNames: ['VAPNS'] },
                { name: 'Domestic', baseNames: ['VAPDMNS'] },
                { name: 'International', baseNames: ['VAPITNS'] },
                { name: '- Japan', baseNames: ['VAPITJPNS'] },
                { name: '- Other', baseNames: ['VAPITOTNS'] }
              ]
            },
            frequencies: [{ name: 'Daily', handle: 'D' }],
            geographies: [{ handle: 'HI', name: 'State of Hawaiʻi' }],
            range: { start: '2019-01-01', end: null },
            smoothing: [
              { name: '7 Day Moving Average', value: '7', yoy: true },
              { name: 'Raw Daily Totals', value: 'rawValues', yoy: true, lag: 1 },
            ]
          },
          /* {
            name: 'Google Mobility Trends',
            ids: [29746, 29747, 29748, 29749, 29750, 29751],
            frequencies: [{ name: 'Daily', handle: 'D' }],
            geographies: [
              { handle: 'HI', name: 'State' },
              { handle: 'HAW', name: 'Hawaii County' },
              { handle: 'HON', name: 'Honolulu County' },
              { handle: 'KAU', name: 'Kauai County' },
              { handle: 'MAU', name: 'Maui County' },
            ]
          }, */
          {
            name: 'Small Business Activity',
            chartType: 'area',
            measurements: {
              dropdown: false,
              baseNames: ['WOMPMER', 'WOMPREV']
            },
            frequencies: [{ name: 'Weekly', handle: 'W' }],
            geographies: [
              { handle: 'HI', name: 'State of Hawaiʻi' },
              { handle: 'HAW', name: 'Hawaiʻi County' },
              { handle: 'HON', name: 'Honolulu County' },
              { handle: 'MAU', name: 'Maui County' },
            ],
            range: { start: null, end: null },
            smoothing: [
              { name: 'Weekly', value: 'rawValues' },
            ]
          },
          {
            name: 'Open Table Restaurant Activity',
            chartType: 'area',
            measurements: {
              dropdown: false,
              baseNames: ['OPENTBL']
            },
            frequencies: [{ name: 'Daily', handle: 'D' }],
            geographies: [{ handle: 'HI', name: 'State of Hawaiʻi' }],
            range: { start: null, end: null },
            smoothing: [
              { name: 'Daily', value: 'rawValues' },
            ]
          },
        ],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
