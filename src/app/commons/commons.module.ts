import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UploadFileToS3Component } from './components/upload-file-to-s3/upload-file-to-s3.component';

@NgModule({
  declarations: [SidebarComponent, UploadFileToS3Component],
  imports: [CommonModule],
  exports: [SidebarComponent, UploadFileToS3Component],
})
export class CommonsModule {}
