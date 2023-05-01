import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-folder',
  templateUrl: './custom-folder.component.html',
  styleUrls: ['./custom-folder.component.css'],
})
export class CustomFolderComponent {
  @Input() folderName: string = 'Unknown Folder';
}
