import { Component, Input } from '@angular/core';
import { S3ServiceService } from '../../services/s3-service.service';

@Component({
  selector: 'app-custom-file',
  templateUrl: './custom-file.component.html',
  styleUrls: ['./custom-file.component.css'],
})
export class CustomFileComponent {
  @Input() fileName: string = 'Unknown File';
  @Input() fullPath: string = '';

  constructor(private s3Service: S3ServiceService) {}

  getIcon() {
    const type = this.getFIleType(this.fileName);
    const icon = FileTypeIconMapping[type as keyof typeof FileTypeIconMapping];
    return `fa ${icon ? icon : 'fa-file'}`;
  }

  getFIleType(file: string) {
    let fileNameArray = file.split('.');
    return fileNameArray[fileNameArray.length - 1].toLocaleLowerCase();
  }

  onDeleteFile() {
    this.s3Service.deleteFile(this.fileName);
  }

  onDownloadFile() {
    this.s3Service.downloadFile(this.fileName);
  }
}

export enum FileTypeIconMapping {
  'jpg' = 'fa-image',
  'png' = 'fa-image',
  'jpeg' = 'fa-image',
  'html' = 'fa-html5',
  'zip' = 'fa-file-archive-o',
  'rar' = 'fa-file-archive-o',
  'pdf' = 'fa-file-pdf-o',
}
