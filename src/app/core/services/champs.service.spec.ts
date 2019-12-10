import { TestBed } from '@angular/core/testing';

import { ChampsService } from './champs.service';

describe('ChampsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChampsService = TestBed.get(ChampsService);
    expect(service).toBeTruthy();
  });
});
