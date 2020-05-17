import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'confirmation',
  moduleId: module.id,
  templateUrl: 'confirmation-service.component.html',
  styleUrls: ['confirmation-service.component.css']
})

export class ConfirmationServiceComponent {
    @Input() message: string = 'Are you sure?';
    @Output() confirm: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    public onSubmit() {
        this.confirm.emit();
    }

    public onClose() {
        this.cancel.emit();
    }
}
