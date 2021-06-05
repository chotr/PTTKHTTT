import { TestBed } from '@angular/core/testing';

import { UserAcessGuard } from './user-acess.guard';

describe('UserAcessGuard', () => {
  let guard: UserAcessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserAcessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
