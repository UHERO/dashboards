import { BehaviorSubject } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HelperService } from '../helper.service';

import { MeasurementSelectorComponent } from './measurement-selector.component';

describe('MeasurementSelectorComponent', () => {
  let component: MeasurementSelectorComponent;
  let fixture: ComponentFixture<MeasurementSelectorComponent>;
  let mockHelperService;
  let currentMeasurementChange = new BehaviorSubject({ dropdown: false, baseNames: ['BNKRUPTTL'] });

  beforeEach(async(() => {
    mockHelperService = {
      currentMeasurement: currentMeasurementChange.asObservable()
    };
    TestBed.configureTestingModule({
      declarations: [ MeasurementSelectorComponent ],
      providers: [
        { provide: HelperService, useValue: mockHelperService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    currentMeasurementChange.next({ dropdown: false, baseNames: ['BNKRUPTTL'] })
    expect(component).toBeTruthy();
  });
});
