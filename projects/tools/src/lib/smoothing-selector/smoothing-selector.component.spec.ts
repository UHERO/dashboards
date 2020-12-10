import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmoothingSelectorComponent } from './smoothing-selector.component';

describe('SmoothingSelectorComponent', () => {
  let component: SmoothingSelectorComponent;
  let fixture: ComponentFixture<SmoothingSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmoothingSelectorComponent ]
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
