import { Component, Input, Inject } from '@angular/core';
import { HelperService } from '../helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-series-sidebar',
  templateUrl: './series-sidebar.component.html',
  styleUrls: ['./series-sidebar.component.scss'],
})
export class SeriesSidebarComponent {
  @Input() dashboardData: Array<any>;

  constructor(
    private helperService: HelperService,
    private router: Router,
    @Inject('logo') public logo,
) {}

  updateSelectedCategory(category) {
    this.helperService.updateSelectedCategory(category);
    this.router.navigate([`/`], { queryParams: {cat: category.name.replace(/\s/g, '')}})
  }
}
