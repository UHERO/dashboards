import { Component, Input, OnDestroy } from '@angular/core';
import { Geography } from '../tools.models';
import { HelperService } from '../helper.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-geo-selector',
  templateUrl: './geo-selector.component.html',
  styleUrls: ['./geo-selector.component.scss']
})
export class GeoSelectorComponent implements OnDestroy {
  @Input() regions: Array<Geography>;
  selectedGeo: Geography;
  geoSubscription: Subscription;

  constructor(private helperService: HelperService) {
    this.geoSubscription = helperService.currentGeo.subscribe((geo) => {
      this.selectedGeo = geo;
    });
  }

  ngOnDestroy() {
    this.geoSubscription.unsubscribe();
  }

  onChange(newGeo: string) {
    this.selectedGeo = this.regions.find(region => region.handle === newGeo);
    this.helperService.updateCurrentGeography(this.selectedGeo);
  }
}
