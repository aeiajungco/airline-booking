import { TestBed } from '@angular/core/testing';

import { LoginVarService } from './login-var.service';

describe('LoginVarService', () => {
  let service: LoginVarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginVarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
