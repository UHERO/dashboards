import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HelperService } from '../helper.service';

import { SeriesSidebarComponent } from './series-sidebar.component';

describe('SeriesSidebarComponent', () => {
  let component: SeriesSidebarComponent;
  let fixture: ComponentFixture<SeriesSidebarComponent>;
  let helperService: HelperService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesSidebarComponent ],
      providers: [
        { provide: HelperService, useValue: {
            updateSelectedCategory: () => null
        }},
        { provide: 'logo', useValue: '' }
      ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesSidebarComponent);
    component = fixture.componentInstance;
    helperService = TestBed.inject(HelperService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
