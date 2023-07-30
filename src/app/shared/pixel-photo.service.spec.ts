import { TestBed } from '@angular/core/testing';

import { PixelPhotoService } from './pixel-photo.service';

describe('PixelPhotoService', () => {
  let service: PixelPhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PixelPhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
