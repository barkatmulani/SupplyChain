import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Injectable, Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subscription } from "rxjs";
import { IBaseDetailComponent } from "../core/base/base-detail/base-detail.interface";
import { Store, select } from "@ngrx/store";
import { RecordSelectors } from "../store/record.selectors";
import * as recordActions from '../store/record.actions';

@Injectable({
    providedIn: 'root',
})
export class DirtyRecordGuard implements CanDeactivate<IBaseDetailComponent> {
    recordUpdatedFlag$: Subscription;
    recordUpdatedFlag: boolean;

    template = `
        <div class="modal-header">
            <h5>Confirmation</h5>
        </div>
        <div class="modal-body">
            {{message}}
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" (click)="onSubmit('Save click')">Confirm</button>
            <button type="button" class="btn btn-outline-dark" (click)="onClose('Save click')">Cancel</button>
        </div>
    `;

    constructor(private modalService: NgbModal, private store: Store){
        this.recordUpdatedFlag$ = this.store.pipe(select(RecordSelectors.getRecordUpdatedFlag)).subscribe(
            (flag: boolean) => this.recordUpdatedFlag = flag
        );
    }

    canDeactivate(
        component: IBaseDetailComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        //     this.closeResult = `Closed with: ${result}`;
        //   }, (reason) => {
        //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        //   });

        if(component.isDirty && !this.recordUpdatedFlag) {
            let result = component.confirmChangeLoss();
            
            return result;
        }
        else {
            this.store.dispatch(new recordActions.ResetRecordUpdatedFlag());
            return true;
        }

    }
}