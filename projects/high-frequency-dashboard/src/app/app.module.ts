import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ToolsModule } from 'tools';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ToolsModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' })],
  providers: [
    {
      provide: 'environment',
      useValue: environment,
    },
    {
      provide: "logo",
      useValue: {
        altText: "UHERO Analytics Logo",
        analyticsLogoSrc: "assets/Analytics_Logo.svg",
      },
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
            range: {
              // limit how much data is returned with apiStart
              // apiStart may be earlier than 'start' as a workaround to
              // accomodate smoothing/lagged data
              apiStart: null, start: null, end: null
            },
            smoothing: [
              { name: 'Daily', value: 'rawValues', yoy: false },
            ],
          },
          {
            name: 'COVID-19 Vaccinations',
            chartType: 'line',
            measurements: {
              dropdown: false,
              baseNames: ['VACCINETWO'],
            },
            frequencies: [{ name: 'Daily', handle: 'D' }],
            geographies: [
              { handle: 'HI', name: 'State of Hawaiʻi' },
              { handle: 'US', name: 'United States' },
            ],
            range: {
              apiStart: null, start: null, end: null
            },
            smoothing: [
              { name: 'Daily', value: 'rawValues', yoy: false },
            ]
          },
          {
            name: 'Unemployment Claims',
            chartType: 'line',
            measurements: {
              dropdown: false,
              baseNames: ['UIICNS', 'UICCNS']
            },
            frequencies: [{ name: 'Weekly', handle: 'W' }],
            geographies: [
              { handle: 'HI', name: 'State of Hawaiʻi' },
              { handle: 'HAW', name: 'Hawaiʻi County' },
              { handle: 'HON', name: 'Honolulu County' },
              { handle: 'KAU', name: 'Kauai County' },
              { handle: 'MAU', name: 'Maui County' },
            ],
            range: { apiStart: '2000-08-19', start: '2000-08-19', end: null },
            smoothing: [
              { name: 'Weekly', value: 'rawValues', yoy: false },
            ],
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
            range: { apiStart: '2005-01-01', start: '2007-01-01', end: null },
            smoothing: [
              { name: '90 Day Moving Average', value: '90', yoy: true },
              { name: '30 Day Moving Average', value: '30', yoy: true },
              { name: '7 Day Moving Average', value: '7', yoy: true },
              { name: 'Daily', value: 'rawValues', yoy: false },
            ],
            description: `Bankruptcies are filed under particular Chapters.
            The above data indicate total bankruptcies filed across all Chapters.
            Moving averages show the trailing period.`
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
            range: { apiStart: null, start: null, end: null },
            smoothing: [
              { name: 'Monthly', value: 'rawValues', yoy: false },
            ],
            description: `Data is gathered by the analytics firm Black Knight Inc.`
          },
          {
            name: 'Passenger Count',
            chartType: 'line',
            measurements: {
              dropdown: true,
              label: 'Select Passenger Origin',
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
            range: { apiStart: '2017-01-01', start: '2019-01-01', end: null },
            smoothing: [
              { name: '7 Day Moving Average', value: '7', yoy: true, lag: 1 },
              { name: 'Raw Daily Totals', value: 'rawValues', yoy: true, lag: 1 },
            ]
          },
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
            range: { apiStart: null, start: null, end: null },
            smoothing: [
              { name: 'Weekly', value: 'rawValues' },
            ],
            description: `Data is collected by Womply, a firm that aggregates credit card transaction information from businesses.`
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
            range: { apiStart: null, start: null, end: null },
            smoothing: [
              { name: 'Daily', value: 'rawValues' },
            ],
            description: `This data shows the year-over-year change in seated diners at restaurants in the OpenTable network.
            Take-out and delivery meals are not included.`,
            descriptionLink: `https://www.opentable.com/state-of-industry`,
            descriptionLinkText: `Find out more about Open Table's methodology here.`
          },
        ],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
