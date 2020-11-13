import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesSidebarComponent } from './series-sidebar.component';

describe('SeriesSidebarComponent', () => {
  let component: SeriesSidebarComponent;
  let fixture: ComponentFixture<SeriesSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
