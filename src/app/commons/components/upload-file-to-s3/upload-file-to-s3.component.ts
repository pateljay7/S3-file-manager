import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { S3ServiceService } from '../../services/s3-service.service';

@Component({
  selector: 'app-upload-file-to-s3',
  templateUrl: './upload-file-to-s3.component.html',
  styleUrls: ['./upload-file-to-s3.component.css'],
})
export class UploadFileToS3Component implements OnInit {
  @Input() fileTypes: string[] = [];
  @Input() S3FolderName: string;
  @Output() uploadedFileKey: EventEmitter<string> = new EventEmitter();
  @Input() MAX_FILE_SIZE: number = 1000; // Size in Kb
  @Input() autoUpload: boolean = false;
  isValidFile: boolean = true;
  isValidFileSize: boolean = true;
  file: File | null = null;
  isUploading = false;
  constructor(
    private s3Service: S3ServiceService // private toasterMessageService: ToastrMessageService, // private helperService: HelperService
  ) {}

  ngOnInit(): void {}

  fileBrowseHandler(e: Event) {
    this.file = (e.target as HTMLInputElement).files?.item(0) as File;
    if (this.file) {
    }
  }

  deleteFile() {
    this.file = null;
  }

  onFileDropped($event: Event) {
    this.fileBrowseHandler($event);
  }

  uploadFileToS3() {
    this.isUploading = true;
    console.log('this.S3FolderName', this.S3FolderName);

    this.s3Service
      .uploadFileToS3(this.file as File, this.S3FolderName)
      .then((data: any) => {
        this.uploadedFileKey.emit(data.Key as string);
        this.isUploading = false;
        console.log('file upload');
      })
      .catch((error) => {
        this.isUploading = false;
        console.log('file uploa', error);
      });
  }
}
