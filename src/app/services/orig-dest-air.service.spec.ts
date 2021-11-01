import { TestBed } from '@angular/core/testing';

import { OrigDestAirService } from './orig-dest-air.service';

describe('OrigDestAirService', () => {
  let service: OrigDestAirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrigDestAirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
