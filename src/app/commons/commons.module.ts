import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UploadFileToS3Component } from './components/upload-file-to-s3/upload-file-to-s3.component';
import { CustomFolderComponent } from './components/custom-folder/custom-folder.component';
import { CustomFileComponent } from './components/custom-file/custom-file.component';

@NgModule({
  declarations: [
    SidebarComponent,
    UploadFileToS3Component,
    CustomFolderComponent,
    CustomFileComponent,
  ],
  imports: [CommonModule],
  exports: [
    SidebarComponent,
    UploadFileToS3Component,
    CustomFolderComponent,
    CustomFileComponent,
  ],
})
export class CommonsModule {}
