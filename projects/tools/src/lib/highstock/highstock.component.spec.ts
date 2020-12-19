import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HelperService } from '../helper.service';

import { HighstockComponent } from './highstock.component';

describe('HighstockComponent', () => {
  let component: HighstockComponent;
  let fixture: ComponentFixture<HighstockComponent>;
  let mockHelperService;

  beforeEach(async(() => {
    mockHelperService = {};
    TestBed.configureTestingModule({
      declarations: [ HighstockComponent ],
      providers: [
        { provide: HelperService, useValue: mockHelperService },
        { provide: 'logo', useValue: '' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
