import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.css'],
})
export class DocViewerComponent {
  dataUrl: string = '';
  file: any;
  private elementRef: ElementRef<HTMLElement>;
  private renderer: Renderer2;

  constructor(
    elementRef: ElementRef<HTMLElement>,
    renderer: Renderer2,
    private modal: NgbModal
  ) {
    this.elementRef = elementRef;
    this.renderer = renderer;
    // this.renderer.addClass(document.body, 'no-scroll'); // disable scrolling when photo preview is open
    console.log('opend');
  }

  close(): void {
    this.modal.dismissAll();
    this.elementRef.nativeElement.remove();
  }
}
