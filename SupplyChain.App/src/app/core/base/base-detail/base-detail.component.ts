import { Component, Inject, Input } from "@angular/core";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { IBaseDetailComponent } from "./base-detail.interface";
import { Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import * as recordActions from "../../../store/record/record.actions";
import { RecordSelectors } from "../../../store/record/record.selectors";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Global, RecordActionType } from "../../../../global";
import { SubComponent } from "../sub-component";

@Component({
    template: ''
})
export abstract class BaseDetailComponent implements IBaseDetailComponent {
    subscriptions: Subscription[] = [];
    height: number;

    private _isDirty: boolean;

    public get isDirty(): boolean {
        return this._isDirty;
    }
    public set isDirty(value: boolean) {
        this._isDirty = value;
    }

    lastNavigationPath: string;
    lastActionType: string;
    navigationFlag: boolean;

    constructor(public router: Router,
                public toastr: ToastrService,
                public store: Store,
                public modalService: NgbModal,
                @Inject("childSelectors") public childSelectors: any) {

        this.height = window.outerHeight;

        this.subscriptions.push(this.store.pipe(select(RecordSelectors.getLastNavigationPath)).subscribe(
            (path: string) => {
                console.log(path);
                this.lastNavigationPath = path;
            }
        ));

        this.subscriptions.push(this.store.pipe(select(this.childSelectors.navigationFlag))
            .subscribe((navigationFlag: any) => this.navigationFlag = navigationFlag)
        );

        this.subscriptions.push(this.store.pipe(select(RecordSelectors.getLastActionType)).subscribe(
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
        ));
    }

    ngAfterViewInit() {
        this.subscriptions.push(this.store.pipe(select(this.childSelectors.navigationFlag)).subscribe(
            flag => {
                if(!flag) {
                    window.scrollBy(0, this.height);
                }
            }
        ));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe);
    }

    async confirmChangeLoss() {
        const modalRef = this.modalService.open(SubComponent);

        modalRef.componentInstance.message = 'Changes will be lost. Are you sure?';

        return modalRef.result.then(() => {
            Global.showNotification('C', this.toastr);
            return true
        }, () => false);
    }

    onCancel() {
      if(this.navigationFlag) {
        this.router.navigate([this.lastNavigationPath]);
      }
      else {
        this.router.navigate([{ outlets: { primary: this.lastNavigationPath, detail: null } }]);
      }

      this.toastr.warning('Record editing cancelled.', 'Warning');
    }

    handleError(data: any) {
        if(data.error) this.toastr.error(data.error.message, 'Error');
        else this.toastr.error('No record found.', 'Error');
    }
}
