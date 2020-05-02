import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription, Observable, EMPTY, of, pipe } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Store, select, Selector } from "@ngrx/store";
import { Router, ActivatedRoute } from "@angular/router";
import { tap, map, catchError, take } from "rxjs/operators";
import * as recordActions from '../../../store/record.actions';
import { RecordSelectors } from "../../../store/record.selectors";
import { Global } from "../../../../global";

export interface IBaseListComponent {
    rows$: Observable<Array<any>>;
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

    selectedId$: Subscription;
    navigationFlag$: Subscription;
    lastActionType$: Subscription;

    selectedId: number;
    navigationFlag: boolean;
    numPages = 1;
    itemsPerPage = 10;
    maxSize = 5;
    hasData = false;
    itemId: number;
    
    constructor(public route: ActivatedRoute,
                public router: Router,
                public childActions: any,
                public navigationPath: 'items',
                public toastr: ToastrService,
                public store: Store,
                public childSelectors: any) {
                    
        this.lastActionType$ = this.store.pipe(select(RecordSelectors.getLastActionType)).subscribe(
            (type:string) => {
            if (type) {
                this.store.dispatch(new recordActions.ResetLastActionType());
                this.store.dispatch(new recordActions.SetRecordUpdatedFlag());
                Global.showNotification(type, this.toastr);
                this.router.navigate([{ outlets: { primary: this.navigationPath, detail: null } }]);
            }}
        );

        // this.rows$ = this.route.data.pipe(
        //     tap(data => {
        //         if(data.resolvedItemList.error) {
        //             this.toastr.error(data.resolvedItemList.error, 'Error!');                    
        //         };
        //         this.hasData = (data && data.length > 0);
        //     }),
        //     map(data => data.resolvedItemList.items),
        //     catchError(e => {
        //         this.toastr.error(e.message, 'Error!');
        //         return of({e});
        //     })
        //   );

        this.rows$ = this.store.pipe(select(this.childSelectors.getItems)).pipe(
            map((rows: any[]) => {
                const items = rows ? rows.map(item => ({...item, id: item.itemId })) : [];
                return items;
            })
        );

        this.pageNo$ = this.store.pipe(select(this.childSelectors.getPageNo));
    
        this.navigationFlag$ = this.store.pipe(select(this.childSelectors.navigationFlag))
            .subscribe((navigationFlag: boolean) => this.navigationFlag = navigationFlag)
    }

    destroy() {
        if(this.selectedId$) this.selectedId$.unsubscribe();
        if(this.navigationFlag$) this.navigationFlag$.unsubscribe();
        if(this.lastActionType$) this.lastActionType$.unsubscribe();
    }
}
