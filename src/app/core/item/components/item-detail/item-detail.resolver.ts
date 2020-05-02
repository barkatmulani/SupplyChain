import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from "@angular/router"
import { Injectable } from "@angular/core";
import { ItemService } from "../../../../services/common.services";
import { catchError, map } from "rxjs/operators";
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
            console.log(message);
            return of({ item: null, error: message });
        }

        return this.itemService.get(+id).pipe(
            map(item => ({ item })),
            catchError(error => {
              console.log(error);
              return of({ item: null, error});
            })
        );
    }
}