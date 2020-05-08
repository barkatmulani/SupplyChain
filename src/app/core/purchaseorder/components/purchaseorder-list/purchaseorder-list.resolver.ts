import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from "@angular/router"
import { Injectable } from "@angular/core";
import { of, Subscription, Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { PurchaseOrderSelectors } from "../../store/purchaseOrder.selectors";
import { LoadPurchaseOrderList } from "../../store/purchaseorder.actions";
import { take, map } from "rxjs/operators";
import { ResolvedPurchaseOrderList } from "../../../../models/purchaseOrder.model";


@Injectable({
    providedIn: 'root',
})
export class PurchaseOrderListResolver implements Resolve<ResolvedPurchaseOrderList> {
    resolvedPurchaseOrderList$: Observable<ResolvedPurchaseOrderList>;

    constructor(private store: Store) { }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.store.dispatch(new LoadPurchaseOrderList());

        this.resolvedPurchaseOrderList$ = this.store.pipe(select(PurchaseOrderSelectors.getPurchaseOrders)).pipe(
            take(2),
            map(x => ({ count: x ? x.length : 0 }))
        );

        return this.resolvedPurchaseOrderList$;
    }
}