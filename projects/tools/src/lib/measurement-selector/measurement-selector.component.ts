import { Component, Input, OnDestroy } from '@angular/core';
import { HelperService } from '../helper.service';
import { Measurement } from '../tools.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-measurement-selector',
  templateUrl: './measurement-selector.component.html',
  styleUrls: ['./measurement-selector.component.scss']
})
export class MeasurementSelectorComponent implements OnDestroy {
  @Input() measurements: Array<Measurement>;
  selectedMeasurement: Measurement;
  measurementSubscription: Subscription;

  constructor(private helperService: HelperService) {
    this.measurementSubscription = helperService.currentMeasurement.subscribe((m) => {
      this.selectedMeasurement = m;
    });
  }

  ngOnDestroy() {
    this.measurementSubscription.unsubscribe();
  }

  onChange(newMeasurement: Array<string>) {
    this.selectedMeasurement = this.measurements.find(m => m.baseNames === newMeasurement);
    this.helperService.updateCurrentMeasurement(this.selectedMeasurement);
  }
}
