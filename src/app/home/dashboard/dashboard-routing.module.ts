import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FolderViewComponent } from './components/folder-view/folder-view.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'folders',
        component: FolderViewComponent,
      },
      {
        path: 'folders/:id',
        component: FolderViewComponent,
      },
      {
        path: '**',
        redirectTo: 'folders',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
