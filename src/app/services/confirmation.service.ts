import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationServiceComponent } from "../shared/confirmation-service/confirmation-service.component";
import { Subscription } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ConfirmationService extends NgbModal {
    confirm: Subscription;
    cancel: Subscription;

    open(message: string) {
        let comp = super.open(ConfirmationServiceComponent, {ariaLabelledBy: 'modal-basic-title'});
        comp.componentInstance.message = message;
        this.confirm = comp.componentInstance.confirm.subscribe(() => this.dismissAll(true));
        this.cancel = comp.componentInstance.cancel.subscribe(() => this.dismissAll(false));
        return comp;
    }

    openDeleteModal() {
        return this.open('Are you sure you want to delete this record');
    }

    openPostModal() {
        return this.open('Are you sure you want to post this record');
    }
}
