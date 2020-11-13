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
      provide: 'dashboardSeries',
      useValue:
        // temp hard code measurement ids (possible replace with category in udaman?)
        [
          {
            name: 'COVID-19 Cases',
            ids: [29762, 29763],
            frequencis: ['D'],
            geographies: [
              { handle: 'HI', name: 'State' },
              { handle: 'HAW', name: 'Hawaii County' },
              { handle: 'HON', name: 'Honolulu County' },
              { handle: 'KAU', name: 'Kauai County' },
              { handle: 'MAU', name: 'Maui County' },
            ],
            selected: true,
          },
          {
            name: 'Unemployment Claims',
            ids: [912, 911],
            frequencies: ['W'],
            geographies: [
              { handle: 'HI', name: 'State' },
              { handle: 'HAW', name: 'Hawaii County' },
              { handle: 'HON', name: 'Honolulu County' },
              { handle: 'KAU', name: 'Kauai County' },
              { handle: 'MAU', name: 'Maui County' },
            ],
            selected: false,
          },
          {
            name: 'Bankruptcies',
            ids: [16281],
            frequencies: ['D'],
            geographies: [{ handle: 'HI', name: 'State' }],
            selected: false,
          },
          {
            name: 'Mortgage Payments',
            ids: [27180],
            frequencies: ['M'],
            geographies: [{ handle: 'HI', name: 'State' }],
            selected: false,
          },
          {
            name: 'Job Postings',
            ids: [29759],
            frequencies: ['W'],
            geographies: [{ handle: 'HI', name: 'State' }],
            selected: false,
          },
          {
            name: 'Passenger Count',
            ids: [629, 4600, 4601, 4602, 661],
            frequencies: ['D'],
            geographies: [{ handle: 'HI', name: 'State' }],
            selected: false,
          },
          {
            name: 'Google Mobility Trends',
            ids: [29746, 29747, 29748, 29749, 29750, 29751],
            frequencies: ['D'],
            geographies: [
              { handle: 'HI', name: 'State' },
              { handle: 'HAW', name: 'Hawaii County' },
              { handle: 'HON', name: 'Honolulu County' },
              { handle: 'KAU', name: 'Kauai County' },
              { handle: 'MAU', name: 'Maui County' },
            ],
            selected: false,
          },
          {
            name: 'Small Business Activity',
            ids: [29760, 29761],
            frequencies: ['W'],
            geographies: [
              { handle: 'HI', name: 'State' },
              { handle: 'HAW', name: 'Hawaii County' },
              { handle: 'HON', name: 'Honolulu County' },
              { handle: 'MAU', name: 'Maui County' },
            ],
            selected: false,
          },
          {
            name: 'Open Table Restaurant Activity',
            ids: [29901],
            frequencies: ['D'],
            geographies: [{ handle: 'HI', name: 'State' }],
            selected: false,
          },
        ],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
