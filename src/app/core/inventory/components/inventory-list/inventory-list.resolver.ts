import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from "@angular/router"
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { ResolvedInventoryList, Inventory } from '../../../../models/inventory.model';
import { Store, select } from "@ngrx/store";
import { LoadInventoryList } from "../../store/inventory.actions";
import { inventorySelectors } from "../../store/inventory.selectors";

@Injectable({
    providedIn: 'root',
})
export class InventoryListResolver implements Resolve<ResolvedInventoryList> {
    inventoryCount: number;

    constructor(private store: Store) { }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.store.pipe(select(inventorySelectors.getInventorys)).subscribe(inventories => {
            this.inventoryCount = inventories ? inventories.length : 0;
        });

        this.store.dispatch(new LoadInventoryList());

        return of({ count: this.inventoryCount });
    }
}