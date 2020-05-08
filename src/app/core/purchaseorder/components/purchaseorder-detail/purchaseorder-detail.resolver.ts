import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from "@angular/router"
import { Injectable } from "@angular/core";
import { PurchaseOrderService } from "../../../../services/common.services";
import { map, take, takeLast, catchError, tap } from "rxjs/operators";
import { ResolvedPurchaseOrder } from "../../../../models/purchaseorder.model";
import { Store, select } from "@ngrx/store";
import { LoadPurchaseOrder } from "../../store/purchaseorder.actions";
import { Observable, of } from "rxjs";
import { PurchaseOrderSelectors } from "../../store/purchaseOrder.selectors";

@Injectable({
    providedIn: 'root',
})
export class PurchaseOrderResolver implements Resolve<ResolvedPurchaseOrder> {
    constructor(private store: Store) { }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = +route.paramMap.get('id');
        
        if (isNaN(id)) {
            const message = 'Provided id ' + id + ' is not a number';
            return { purchaseOrder: null, error: message };
        }

        this.store.dispatch(new LoadPurchaseOrder(id));
    }
}