import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from "@angular/router"
import { Injectable } from "@angular/core";
import { of, Subscription, Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { ReceiptSelectors } from "../../store/receipt.selectors";
import { LoadReceiptList } from "../../store/receipt.actions";
import { take, map } from "rxjs/operators";
import { ResolvedReceiptList } from "../../../../models/receipt.model";


@Injectable({
    providedIn: 'root',
})
export class ReceiptListResolver implements Resolve<ResolvedReceiptList> {
    resolvedReceiptList$: Observable<ResolvedReceiptList>;

    constructor(private store: Store) { }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.store.dispatch(new LoadReceiptList());

        this.resolvedReceiptList$ = this.store.pipe(select(ReceiptSelectors.getReceipts)).pipe(
            take(2),
            map(x => ({ count: x ? x.length : 0 }))
        );

        return this.resolvedReceiptList$;
    }
}