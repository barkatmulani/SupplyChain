import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from "@angular/router"
import { Injectable } from "@angular/core";
import { ItemService } from "../../../../services/common.services";
import { catchError, map, tap } from "rxjs/operators";
import { of } from "rxjs";
import { ResolvedItem } from "../../../../models/item.model";

@Injectable({
    providedIn: 'root',
})
export class ItemResolver implements Resolve<ResolvedItem> {
    constructor(private itemService: ItemService) { }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = +route.paramMap.get('id');

        if (isNaN(id)) {
            const message = 'Provided id ' + id + ' is not a number';
            return of({ item: null, error: message });
        }

        return this.itemService.get(+id).pipe(
            catchError(error => {
                return of({ item: null, error })
            }),
            map(data => data && data.error ? data : { item: data })
        );
    }
}