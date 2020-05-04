import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from "@angular/router"
import { Injectable } from "@angular/core";
import { of, Subscription } from "rxjs";
import { ResolvedItemList } from '../../../../models/item.model';
import { Store, select } from "@ngrx/store";
import { LoadItemList } from "../../store/item.actions";
import { ItemSelectors } from "../../store/item.selectors";


@Injectable({
    providedIn: 'root',
})
export class ItemListResolver implements Resolve<ResolvedItemList> {
    itemCount$: Subscription;
    itemCount: number;

    constructor(private store: Store) { }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.itemCount$ = this.store.pipe(select(ItemSelectors.getItems)).subscribe(items => {
            this.itemCount = items ? items.length : 0;
        });

        //this.store.dispatch(new LoadItemList());

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