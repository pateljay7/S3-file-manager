import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UploadFileToS3Component } from './components/upload-file-to-s3/upload-file-to-s3.component';
import { CustomFolderComponent } from './components/custom-folder/custom-folder.component';
import { CustomFileComponent } from './components/custom-file/custom-file.component';
import { DocViewerComponent } from './components/doc-viewer/doc-viewer.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@NgModule({
  declarations: [
    SidebarComponent,
    UploadFileToS3Component,
    CustomFolderComponent,
    CustomFileComponent,
    DocViewerComponent,
  ],
  imports: [CommonModule, NgxDocViewerModule],
  exports: [
    SidebarComponent,
    UploadFileToS3Component,
    CustomFolderComponent,
    CustomFileComponent,
    DocViewerComponent,
  ],
})
export class CommonsModule {}
