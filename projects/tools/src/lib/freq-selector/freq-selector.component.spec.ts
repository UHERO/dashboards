import { BehaviorSubject } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HelperService } from '../helper.service';

import { FreqSelectorComponent } from './freq-selector.component';

describe('FreqSelectorComponent', () => {
  let component: FreqSelectorComponent;
  let fixture: ComponentFixture<FreqSelectorComponent>;
  let mockHelperService;
  let currentFreqChange = new BehaviorSubject({ name: 'Daily', handle: 'D' });

  beforeEach(async(() => {
    mockHelperService = {
      currentFreq: currentFreqChange.asObservable()
    };
    TestBed.configureTestingModule({
      declarations: [ FreqSelectorComponent ],
      providers: [
        { provide: HelperService, useValue: mockHelperService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreqSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    currentFreqChange.next({ name: 'Daily', handle: 'D' });
    expect(component).toBeTruthy();
  });
});
