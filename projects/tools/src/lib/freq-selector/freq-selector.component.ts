import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Frequency } from '../tools.models';
import { HelperService } from '../helper.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-freq-selector',
  templateUrl: './freq-selector.component.html',
  styleUrls: ['./freq-selector.component.scss']
})
export class FreqSelectorComponent implements OnDestroy {
  @Input() frequencies: Array<Frequency>;
  selectedFreq: Frequency;
  freqSubscription: Subscription;

  constructor(private helperService: HelperService) {
    this.freqSubscription = helperService.currentFreq.subscribe((freq) => {
      this.selectedFreq = freq;
    });

  }

  ngOnDestroy() {
    this.freqSubscription.unsubscribe();
  }

  onChange(newFreq: string) {
    this.selectedFreq = this.frequencies.find(freq => freq.handle === newFreq);
    this.helperService.updateCurrentFrequency(this.selectedFreq);
  }
}
