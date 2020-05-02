import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from "@angular/router"
import { Injectable } from "@angular/core";
import { ItemService } from "../../../../services/common.services";
import { catchError, map, tap, take } from "rxjs/operators";
import { of, pipe } from "rxjs";
import { ResolvedItemList, Item } from '../../../../models/item.model';
import { Store, select } from "@ngrx/store";
import { LoadItemList } from "../../store/item.actions";
import { itemSelectors } from "../../store/item.selectors";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root',
})
export class ItemListResolver implements Resolve<ResolvedItemList> {
    itemCount: number;

    constructor(private store: Store) { }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.store.pipe(select(itemSelectors.getItems)).subscribe(items => {
            this.itemCount = items ? items.length : 0;
        });

        this.store.dispatch(new LoadItemList());

        return of({ count: this.itemCount });

        // return this.store.pipe(select(itemSelectors.getItems)).pipe(
        //     take(2),
        //     map((rows) => {
        //         const items = rows ? rows.map(item => ({...item, id: item.itemId })) : [];
        //         return { items };
        //     }),
        //     catchError(error => {
        //         data => console.log(data);
        //         return of({ items: null, error });
        //     }),
        // );
    }
}