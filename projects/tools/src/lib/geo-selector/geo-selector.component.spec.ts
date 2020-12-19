import { BehaviorSubject } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HelperService } from '../helper.service';

import { GeoSelectorComponent } from './geo-selector.component';

describe('GeoSelectorComponent', () => {
  let component: GeoSelectorComponent;
  let fixture: ComponentFixture<GeoSelectorComponent>;
  let mockHelperService;
  let currentGeoChange = new BehaviorSubject({ name: 'State of Hawaii', handle: 'HI' });

  beforeEach(async(() => {
    mockHelperService = {
      currentGeo: currentGeoChange.asObservable()
    };
    TestBed.configureTestingModule({
      declarations: [ GeoSelectorComponent ],
      providers: [
        { provide: HelperService, useValue: mockHelperService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    currentGeoChange.next({ name: 'State of Hawaii', handle: 'HI' });
    expect(component).toBeTruthy();
  });
});
