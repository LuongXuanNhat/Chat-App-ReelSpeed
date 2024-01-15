import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { verifiedGuard } from './verified.guard';

describe('verifiedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => verifiedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
