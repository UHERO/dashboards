import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { HelperService } from './helper.service';

describe('HelperService', () => {
  let service: HelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        HelperService,
        { provide: 'dashboardData', useValue: [] },
        { provide: 'environment', useValue: '' },
        provideHttpClient(withInterceptorsFromDi())
    ]
});
    service = TestBed.inject(HelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
