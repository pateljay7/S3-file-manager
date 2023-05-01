import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-file',
  templateUrl: './custom-file.component.html',
  styleUrls: ['./custom-file.component.css'],
})
export class CustomFileComponent {
  @Input() fileName: string = 'Unknown File';
}
