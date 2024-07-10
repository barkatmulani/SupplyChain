import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    template: `
        <div class="modal-header">
            <h5>Confirmation</h5>
        </div>
        <div class="modal-body">
            {{message}}
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" (click)="onConfirm()">Confirm</button>
            <button type="button" class="btn btn-outline-dark" (click)="onCancel()">Cancel</button>
        </div>
    `,
    standalone: true
})
export class SubComponent {
    @Input() message: string;

    constructor(private activeModal: NgbActiveModal) { }

    onConfirm() {
        this.activeModal.close(true);
    }

    onCancel() {
        this.activeModal.dismiss();
    }
}