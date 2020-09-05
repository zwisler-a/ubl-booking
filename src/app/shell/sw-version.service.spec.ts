import { TestBed } from '@angular/core/testing';

import { SwVersionService } from './sw-version.service';

describe('SwVersionService', () => {
  let service: SwVersionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwVersionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
