import { BehaviorSubject } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HelperService } from '../helper.service';

import { SmoothingSelectorComponent } from './smoothing-selector.component';

describe('SmoothingSelectorComponent', () => {
  let component: SmoothingSelectorComponent;
  let fixture: ComponentFixture<SmoothingSelectorComponent>;
  let mockHelperService;
  let currentSmoothingChange = new BehaviorSubject({ name: 'Monthly', value: 'rawValues', yoy: false });

  beforeEach(async(() => {
    mockHelperService = {
      currentSmoothing: currentSmoothingChange.asObservable()
    };
    TestBed.configureTestingModule({
      declarations: [ SmoothingSelectorComponent ],
      providers: [
        { provide: HelperService, useValue:mockHelperService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmoothingSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
