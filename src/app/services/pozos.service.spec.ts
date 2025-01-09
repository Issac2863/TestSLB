import { TestBed } from '@angular/core/testing';

import { PozosService } from './pozos.service';

describe('PozosService', () => {
  let service: PozosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PozosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
