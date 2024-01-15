import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { chatGuard } from './chatguard.guard';

describe('chatguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => chatGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
