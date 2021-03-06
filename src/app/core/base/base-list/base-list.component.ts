import { Component } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Store, select } from "@ngrx/store";
import { Router, ActivatedRoute } from "@angular/router";
import * as recordActions from '../../../store/record.actions';
import { RecordSelectors } from "../../../store/record.selectors";
import { Global, RecordActionType } from "../../../../global";
import { ConfirmationService } from "../../../services/confirmation.service";

export interface IBaseListComponent {
    pageNo$: Observable<number>;
    selectedId$: Subscription;
    navigationFlag$: Subscription;

    selectedId: number;
    navigationFlag: boolean;
}

@Component({})
export class BaseListComponent implements IBaseListComponent {
    rows$: Observable<Array<any>>;
    pageNo$: Observable<number>;
    recordsPerPage$: Observable<number>;
    lastNavigationPath$: Subscription;

    selectedId$: Subscription;
    navigationFlag$: Subscription;
    lastActionType$: Subscription;

    selectedId: number;
    navigationFlag: boolean;
    numPages = 1;
    maxSize = 5;
    hasData = false;
    lastNavigationPath: string;

    constructor(public route: ActivatedRoute,
                public router: Router,
                public toastr: ToastrService,
                public store: Store,
                public confirmationService: ConfirmationService,
                public childSelectors: any,
                public childActions: any) {

        this.lastNavigationPath$ = this.store.pipe(select(RecordSelectors.getLastNavigationPath)).subscribe(
            (path: string) => {
                this.lastNavigationPath = path;
            }
        )

        this.lastActionType$ = this.store.pipe(select(RecordSelectors.getLastActionType)).subscribe(
            (type:string) => {
            if (type && (type === RecordActionType.Delete || type === RecordActionType.Post)) {
                this.store.dispatch(new recordActions.ResetLastActionType());
                this.store.dispatch(new recordActions.SetRecordUpdatedFlag());
                Global.showNotification(type, this.toastr);
                // this.router.navigate([{ outlets: { primary: this.lastNavigationPath, detail: null } }]);
            }}
        );

        this.pageNo$ = this.store.pipe(select(this.childSelectors.getPageNo));

        this.recordsPerPage$ = this.store.pipe(select(this.childSelectors.getRecordsPerPage));

        this.navigationFlag$ = this.store.pipe(select(this.childSelectors.navigationFlag))
            .subscribe((navigationFlag: boolean) => this.navigationFlag = navigationFlag);
    }

    addClick(entity: string) {
      if (this.navigationFlag)
        this.router.navigate([{ outlets: { primary: [entity, 'edit'] }, detail: null }]);
      else
        this.router.navigate(['/' + entity + '/view', { outlets: { detail: [] }}]);
    }

    switchToggle(value) {
      this.store.dispatch(new this.childActions.SetNavigationFlag(value));

      if (this.navigationFlag) {
        this.router.navigate([{ outlets: { detail: null }}]);
      }
    }

    public recordsPerPageChange(data: number) {
      this.store.dispatch(new this.childActions.SetRecordsPerPage(data));
      this.store.dispatch(new this.childActions.SetPageNo(1));
    }

    ngOnDestroy() {
        if(this.selectedId$) this.selectedId$.unsubscribe();
        if(this.navigationFlag$) this.navigationFlag$.unsubscribe();
        if(this.lastActionType$) this.lastActionType$.unsubscribe();
    }
}
