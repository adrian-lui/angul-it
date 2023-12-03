import { TestBed } from '@angular/core/testing';

import { StageGuardService } from './stageguard.service';

describe('StageGuardService', () => {
  let service: StageGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StageGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
