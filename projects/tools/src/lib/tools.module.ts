import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToolsComponent } from './tools.component';
import { SeriesSidebarComponent } from './series-sidebar/series-sidebar.component';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';



@NgModule({
  declarations: [ToolsComponent, SeriesSidebarComponent, DashboardViewComponent],
  imports: [
    BrowserModule
  ],
  exports: [ToolsComponent, DashboardViewComponent]
})
export class ToolsModule { }
