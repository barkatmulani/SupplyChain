import { Component, ViewChild, NgModule, Output, EventEmitter, Input, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'confirmation',
  moduleId: module.id,
  templateUrl: 'confirmation.component.html',
  styleUrls: ['confirmation.component.css']
})

export class ConfirmationComponent {
    @Input() message: string = 'Are you sure?';
    @Output() confirm: EventEmitter<any> = new EventEmitter();

    @ViewChild('content') content: NgbModal;
    @ViewChild('modal') modal: TemplateRef<any>;

    constructor(public modalService: NgbModal) {
    }

    public open() {
        this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'});
    }

    public openWithMessage(message) {
        console.log(this.modal);
        this.message = message;
        this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'});
    }

    public onOpen() {

    }

    public onSubmit() {
        this.confirm.emit();
        this.modalService.dismissAll();
    }

    public onClose() {
        this.modalService.dismissAll();
    }
}
