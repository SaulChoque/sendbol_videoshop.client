import { TestBed } from '@angular/core/testing';

import { ChiptagsService } from './chiptags.service';

describe('ChiptagsService', () => {
  let service: ChiptagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChiptagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
