import { Component, ViewChild } from '@angular/core';
import { PopupmodelService } from 'src/app/commons/services/popupmodel.service';
import { S3ServiceService } from 'src/app/commons/services/s3-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  allDataList: { key: string; type: string }[] = [];
  isDataLoaded: boolean = false;
  dataUrl: string = '';
  selectedData: any = {};
  fullPath: string = '';
  newFolderName: string = '';
  @ViewChild('dataShow') dataShow: any;
  constructor(
    private s3Service: S3ServiceService,
    private popupModelService: PopupmodelService
  ) {}
  async ngOnInit() {
    this.fetchInitData();
  }

  onClick(data: { key: string; type: string }) {
    this.selectedData = data;
    if (data.type == 'FILE')
      this.s3Service.getFileFromS3(data.key, this.fullPath).then((data) => {
        this.dataUrl = data;
        this.openModel(this.dataShow);
      });
    else {
      this.fullPath += data.key;
      this.fetchInitData();
    }
  }

  openModel(template: any, size?: string) {
    this.popupModelService.triggerModalBybtn(template, {
      keyboard: false,
      centered: true,
      size: size ? size : 'xl',
    });
  }

  uploadedFile() {
    this.popupModelService.dismissAll();
    this.fetchInitData();
  }

  onPathChange(path: string, index: number) {
    if (path == '') this.fullPath = '';
    else {
      const pathArray = this.fullPath.split('/');
      this.fullPath = pathArray.slice(0, index).join('/') + '/';
    }
    this.fetchInitData();
  }

  fetchInitData() {
    // this.isDataLoaded = false;
    this.s3Service
      .listFolders('datastoragemanager', this.fullPath)
      .then((data) => {
        this.allDataList = data;
        this.isDataLoaded = true;
      });
  }

  async newFolder() {
    await this.s3Service.createFolder(this.fullPath + this.newFolderName + '/');
    this.popupModelService.dismissAll();
    this.fetchInitData();
    this.newFolderName = '';
  }
}
