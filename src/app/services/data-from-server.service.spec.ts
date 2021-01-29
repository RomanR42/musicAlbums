import { TestBed } from '@angular/core/testing';

import { DataFromServerService } from './data-from-server.service';

describe('DataFromServerService', () => {
  let service: DataFromServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataFromServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
