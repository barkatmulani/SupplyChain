import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from "@angular/router"
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { LoadReceipt, NewReceipt } from "../../store/receipt.actions";

@Injectable({
    providedIn: 'root',
})
export class ReceiptResolver implements Resolve<any> {
    constructor(private store: Store) { }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = +route.paramMap.get('id')!;
        
        if (id)
            this.store.dispatch(new LoadReceipt(id));
        else
            this.store.dispatch(new NewReceipt());
    }
}