import { TestBed } from '@angular/core/testing';

import { NewsapicolombiaService } from './newsapicolombia.service';

describe('NewsapicolombiaService', () => {
  let service: NewsapicolombiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsapicolombiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
