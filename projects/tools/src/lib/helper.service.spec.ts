import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { HelperService } from './helper.service';

describe('HelperService', () => {
  let service: HelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HelperService,
        { provide: 'dashboardData', useValue: [] },
        { provide: 'environment', useValue: '' }
      ],
      imports: [HttpClientModule]
    });
    service = TestBed.inject(HelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
