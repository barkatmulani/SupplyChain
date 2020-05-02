import { Component, Input } from "@angular/core";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { IBaseDetailComponent } from "./base-detail.interface";
import { Subscription, Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import * as recordActions from "../../../store/record.actions";
import { RecordSelectors } from "../../../store/record.selectors";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Global } from "../../../../global";

@Component({
    templateUrl: 'base-detail.component.html'
})
export class BaseDetailComponent implements IBaseDetailComponent {
    lastActionType$: Subscription;

    isDirty: boolean;
    lastActionType: string;

    constructor(public modalService: NgbModal,
                public store: Store,
                public toastr: ToastrService,
                public router: Router) {

        this.lastActionType$ = this.store.pipe(select(RecordSelectors.getLastActionType)).subscribe(
            (type:string) => {
                if (type) {
                    this.store.dispatch(new recordActions.ResetLastActionType());
                    this.store.dispatch(new recordActions.SetRecordUpdatedFlag());
                    Global.showNotification(type, this.toastr);
                    this.router.navigate([{ outlets: { primary: 'items', detail: null } }]);
                }
            }
        );
        // this.lastActionType$ = this.store.pipe(select(RecordSelectors.getLastActionType)).subscribe(
        //     (type: string) => {
        //         this.lastActionType = type;
        //     });

        // this.lastActionType$ = this.store.pipe(select(this.childSelectors.getLastActionType)).subscribe(
        //     (type:string) => {
        //         console.log(type)
        //     if (type) {
        //         let action: string;

        //         this.lastActionType = type;

        //         switch (type) {
        //             case 'A': action = 'added'; break;
        //             case 'U': action = 'updated'; break;
        //             case 'D': action = 'deleted'; break;
        //         }
                
        //         this.store.dispatch(new this.childActions.ResetLastActionType());
        //         this.toastr.success(`Record ${action} successfully`, 'Success!');
        //         this.router.navigate([{ outlets: { primary: navigationPath, detail: null } }]);
        //     }}
        // );

        // this.recordChanged$ = this.store.pipe(select(RecordSelectors.getRecordChangeType))
        //     .subscribe((type: any) => {
        //         if (type) {
        //             let action: string;

        //             this.recordChangeType = type;
        
        //             switch (type) {
        //                 case 'A': action = 'added'; break;
        //                 case 'U': action = 'updated'; break;
        //                 case 'D': action = 'deleted'; break;
        //             }
        
        //             this.toastr.success(`Record ${action} successfully`, 'Success!');
        //             this.store.dispatch(new recordActions.ResetRecordChangeType());
        //             this.router.navigate([{ outlets: { primary: navigationPath, detail: null } }]);
        //         }}
        //     );
    }

    destroy() {
        if(this.lastActionType$) this.lastActionType$.unsubscribe();
    }
    
    async confirmChangeLoss() {
        const modalRef = this.modalService.open(SubComponent);

        modalRef.componentInstance.message = 'Changes will be lost. Are you sure?';
        
        return modalRef.result.then(() => {
                Global.showNotification('C', this.toastr);
                return true
        }, () => false);
    }
}


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
    `
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
