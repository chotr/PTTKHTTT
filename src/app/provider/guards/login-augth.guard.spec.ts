import { TestBed } from '@angular/core/testing';

import { LoginAugthGuard } from './login-augth.guard';

describe('LoginAugthGuard', () => {
  let guard: LoginAugthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginAugthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
