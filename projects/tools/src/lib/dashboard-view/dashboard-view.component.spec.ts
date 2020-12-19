import { BehaviorSubject } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HelperService } from '../helper.service';

import { DashboardViewComponent } from './dashboard-view.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardViewComponent', () => {
  let component: DashboardViewComponent;
  let fixture: ComponentFixture<DashboardViewComponent>;
  let mockHelperService;
  let currentGeoChange = new BehaviorSubject({ name: 'State of Hawaii', handle: 'HI' });
  let currentFreqChange = new BehaviorSubject({ name: 'Daily', handle: 'D' });
  let currentMeasurementChange = new BehaviorSubject({ dropdown: false, baseNames: ['BNKRUPTTL'] });
  let currentSmoothingChange = new BehaviorSubject({ name: 'Monthly', value: 'rawValues', yoy: false });

  beforeEach(async(() => {
    mockHelperService = {
      currentFreq: currentFreqChange.asObservable(),
      currentGeo: currentGeoChange.asObservable(),
      currentMeasurement: currentMeasurementChange.asObservable(),
      currentSmoothing: currentSmoothingChange.asObservable(),
      currentCategory: {}
    };
    TestBed.configureTestingModule({
      declarations: [ DashboardViewComponent ],
      providers: [
        { provide: HelperService, useValue: mockHelperService }
      ],
      imports: [RouterTestingModule]
    })
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardViewComponent);
    component = fixture.componentInstance;
    component.currentCategory = {
      name: 'Mortgage Payments',
      chartType: 'line',
      measurements: {
        dropdown: false,
        baseNames: ['NONCURR']
      },
      frequencies: [{ name: 'Monthly', handle: 'M' }],
      geographies: [{ handle: 'HI', name: 'State of Hawaiʻi' }],
      range: { start: null, end: null },
      smoothing: [
        { name: 'Monthly', value: 'rawValues', yoy: false },
      ],
      description: `Data is gathered by the analytics firm Black Knight Inc.`
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
