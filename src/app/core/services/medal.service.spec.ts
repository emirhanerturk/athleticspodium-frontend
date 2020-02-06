import { TestBed } from '@angular/core/testing';

import { MedalService } from './medal.service';

describe('MedalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedalService = TestBed.get(MedalService);
    expect(service).toBeTruthy();
  });
});
