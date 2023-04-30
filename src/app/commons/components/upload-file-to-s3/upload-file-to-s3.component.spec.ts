import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFileToS3Component } from './upload-file-to-s3.component';

describe('UploadFileToS3Component', () => {
  let component: UploadFileToS3Component;
  let fixture: ComponentFixture<UploadFileToS3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadFileToS3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadFileToS3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
