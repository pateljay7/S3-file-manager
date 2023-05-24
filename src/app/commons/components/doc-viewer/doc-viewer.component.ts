import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileType } from '../../interfaces/file.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HighlightAutoResult, HighlightLoader } from 'ngx-highlightjs';

const themeGithub: string = 'node_modules/highlight.js/styles/github.css';
const themeAndroidStudio: string =
  'node_modules/highlight.js/styles/androidstudio.css';

@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.css'],
})
export class DocViewerComponent implements OnInit {
  dataUrl: string = '';
  file: FileType;
  private elementRef: ElementRef<HTMLElement>;
  private renderer: Renderer2;
  response: HighlightAutoResult;

  code: any;

  constructor(
    elementRef: ElementRef<HTMLElement>,
    renderer: Renderer2,
    private modal: NgbModal,
    private http: HttpClient,
    private hljsLoader: HighlightLoader
  ) {
    this.elementRef = elementRef;
    this.renderer = renderer;
    // this.renderer.addClass(document.body, 'no-scroll'); // disable scrolling when photo preview is open
    console.log('opend');
  }
  ngOnInit(): void {
    this.hljsLoader.setTheme(
      'node_modules/highlight.js/styles/androidstudio.css'
    );

    console.log('dataurl', this.dataUrl);

    this.http.get(this.dataUrl).subscribe({
      next: (data) => {
        console.log('data', data);
      },
      error: (error) => {
        console.log('err', error.error.text);
        this.code = error.error.text;
      },
    });
    console.log('aaa');
  }

  close(): void {
    this.modal.dismissAll();
    this.elementRef.nativeElement.remove();
  }

  currentTheme: string = themeGithub;

  onHighlight(e: HighlightAutoResult) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      secondBest: '{...}',
      value: '{...}',
    };
  }

  changeTheme() {
    this.currentTheme =
      this.currentTheme === themeGithub ? themeAndroidStudio : themeGithub;
    this.hljsLoader.setTheme(this.currentTheme);
  }
}
