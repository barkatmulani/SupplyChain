import { Component, Input } from "@angular/core";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { IBaseDetailComponent } from "./base-detail.interface";
import { Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import * as recordActions from "../../../store/record.actions";
import { RecordSelectors } from "../../../store/record.selectors";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Global, RecordActionType } from "../../../../global";

@Component({
    templateUrl: 'base-detail.component.html'
})
export class BaseDetailComponent implements IBaseDetailComponent {
    lastNavigationPath$: Subscription;
    lastActionType$: Subscription;
    navigationFlag$: Subscription;
    height: number;

    isDirty: boolean;
    lastNavigationPath: string;
    lastActionType: string;
    navigationFlag: boolean;

    constructor(public router: Router,
                public toastr: ToastrService,
                public store: Store,
                public modalService: NgbModal,
                public childSelectors: any) {
                    
        this.height = window.outerHeight;

        this.lastNavigationPath$ = this.store.pipe(select(RecordSelectors.getLastNavigationPath)).subscribe(
            (path: string) => {
                console.log(path);
                this.lastNavigationPath = path;
            }
        )

        this.navigationFlag$ = this.store.pipe(select(this.childSelectors.navigationFlag))
            .subscribe((navigationFlag: boolean) => this.navigationFlag = navigationFlag);
        
        this.lastActionType$ = this.store.pipe(select(RecordSelectors.getLastActionType)).subscribe(
            (type: string) => {
                if (type && type !== RecordActionType.Delete && type !== RecordActionType.Post) {
                    this.store.dispatch(new recordActions.ResetLastActionType());
                    this.store.dispatch(new recordActions.SetRecordUpdatedFlag());
                    Global.showNotification(type, this.toastr);
                    if(this.navigationFlag)
                        this.router.navigate([this.lastNavigationPath]);
                    else
                        this.router.navigate([{ outlets: { primary: this.lastNavigationPath, detail: null } }]);
                }
            }
        );
    }
    
    ngAfterViewInit() {
        this.navigationFlag$ = this.store.pipe(select(this.childSelectors.navigationFlag)).subscribe(
            flag => {
                if(!flag) {
                    window.scrollBy(0, this.height);
                }
            }
        );
    }
    
    ngOnDestroy() {
        if(this.lastNavigationPath$) this.lastNavigationPath$.unsubscribe();
        if(this.navigationFlag$) this.navigationFlag$.unsubscribe();
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

    handleError(data) {
        if(data.error) this.toastr.error(data.error.message, 'Error');
        else this.toastr.error('No record found.', 'Error');
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
