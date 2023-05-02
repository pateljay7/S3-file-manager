import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupmodelService } from 'src/app/commons/services/popupmodel.service';
import { S3ServiceService } from 'src/app/commons/services/s3-service.service';
import * as base64 from 'base-64';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocViewerComponent } from 'src/app/commons/components/doc-viewer/doc-viewer.component';

@Component({
  selector: 'app-folder-view',
  templateUrl: './folder-view.component.html',
  styleUrls: ['./folder-view.component.css'],
})
export class FolderViewComponent implements OnInit {
  allDataList: { key: string; type: string }[] = [];
  isDataLoaded: boolean = false;
  dataUrl: string = '';
  selectedData: any = {};
  fullPath: string = '';
  newFolderName: string = '';
  isDisabled: boolean = false;

  @ViewChild('dataShow') dataShow: any;
  constructor(
    private s3Service: S3ServiceService,
    private popupModelService: PopupmodelService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NgbModal
  ) {
    // const activeModal = this.modal.open(DocViewerComponent, {
    //   size: 'xl',
    //   centered: true,
    // });
  }

  async ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        const decPath = base64.decode(params['id']).replaceAll('#', '/');
        this.fullPath = decPath;
      }
      this.fetchInitData();
    });
  }

  onClick(data: { key: string; type: string }, e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.selectedData = data;
    if (data.type == 'FILE') {
      this.s3Service.getFileFromS3(data.key, this.fullPath).then((data) => {
        this.modal.dismissAll();
        const activeModal = this.modal.open(DocViewerComponent, {
          size: 'xl',
          centered: true,
        });
        activeModal.componentInstance.dataUrl = data;
        activeModal.componentInstance.file = this.selectedData;
        this.dataUrl = data;
      });
    } else {
      const encPath = base64.encode(
        (this.fullPath + data.key).replaceAll('/', '#')
      );
      this.router.navigate([`/drive/folders/${encPath}`]);
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
    const encPath = base64.encode(this.fullPath).replaceAll('/', '#');
    this.router.navigate([`/drive/folders/${encPath}`]);
  }

  fetchInitData() {
    this.isDataLoaded = false;
    this.isDisabled = true;
    this.s3Service
      .listFolders('datastoragemanager', this.fullPath)
      .then((data) => {
        this.allDataList = data;
        this.isDataLoaded = true;
        this.isDisabled = false;
      });
  }

  async newFolder() {
    await this.s3Service.createFolder(this.fullPath + this.newFolderName + '/');
    this.popupModelService.dismissAll();
    this.fetchInitData();
    this.newFolderName = '';
  }
}
