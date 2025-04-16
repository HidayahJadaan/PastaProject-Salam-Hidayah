import { TestBed } from '@angular/core/testing';

import { IihStorageService } from './iih-storage.service';

describe('IihStorageService', () => {
  let service: IihStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IihStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
