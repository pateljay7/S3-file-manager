import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CommonsModule } from 'src/app/commons/commons.module';
import { FolderViewComponent } from './components/folder-view/folder-view.component';

@NgModule({
  declarations: [DashboardComponent, FolderViewComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxDocViewerModule,
    NgSelectModule,
    FormsModule,
    CommonsModule
  ],
})
export class DashboardModule {}
