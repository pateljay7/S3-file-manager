import { Injectable, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class PopupmodelService {
  closeModal!: string;
  constructor(private modalService: NgbModal) {}

  triggerModalBybtn(content: TemplateRef<HTMLElement>, styleObject?: any) {
    this.modalService.open(content, styleObject).result.then(
      (res: any) => {
        this.closeModal = `Closed with: ${res}`;
      },
      (res: any) => {
        this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      }
    );
  }

  triggerCloseModal() {
    this.modalService.dismissAll();
  }

  dismissAll() {
    this.modalService.dismissAll();
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
