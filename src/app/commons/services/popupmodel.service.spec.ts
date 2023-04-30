import { TestBed } from '@angular/core/testing';

import { PopupmodelService } from './popupmodel.service';

describe('PopupmodelService', () => {
  let service: PopupmodelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupmodelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
