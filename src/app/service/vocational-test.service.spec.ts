import { TestBed } from '@angular/core/testing';

import { VocationalTestService } from './vocational-test.service';

describe('VocationalTestService', () => {
  let service: VocationalTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VocationalTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
