import { Component, Input, OnDestroy } from '@angular/core';
import { HelperService } from '../helper.service';
import { Smoothing } from '../tools.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-smoothing-selector',
  templateUrl: './smoothing-selector.component.html',
  styleUrls: ['./smoothing-selector.component.scss']
})
export class SmoothingSelectorComponent implements OnDestroy {
  @Input() smoothingCalcs: Array<Smoothing>;
  selectedSmoothing: Smoothing;
  smoothingSubscription: Subscription;

  constructor(private helperService: HelperService) {
    this.smoothingSubscription = helperService.currentSmoothing.subscribe((smoothing) => {
      this.selectedSmoothing = smoothing;
    });
  }

  ngOnDestroy() {
    this.smoothingSubscription.unsubscribe();
  }

  onChange(newSmoothing: string) {
    this.selectedSmoothing = this.smoothingCalcs.find(s => s.value === newSmoothing);
    this.helperService.updateCurrentSmoothing(this.selectedSmoothing);
  }
}
