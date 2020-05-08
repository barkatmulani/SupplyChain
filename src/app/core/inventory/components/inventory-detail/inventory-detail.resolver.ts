import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from "@angular/router"
import { Injectable } from "@angular/core";
import { InventoryService } from "../../../../services/common.services";
import { catchError, map, tap } from "rxjs/operators";
import { of } from "rxjs";
import { ResolvedInventory } from "../../../../models/inventory.model";

@Injectable({
    providedIn: 'root',
})
export class InventoryResolver implements Resolve<ResolvedInventory> {
    constructor(private inventoryService: InventoryService) { }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = +route.paramMap.get('id');
        
        if (isNaN(id)) {
            const message = 'Provided id ' + id + ' is not a number';
            console.log(message);
            return of({ inventory: null, error: message });
        }

        return this.inventoryService.get(+id).pipe(
            catchError(error => {
                return of({ inventory: null, error })
            }),
            map(data => data && data.error ? data : { inventory: data })
        );
    }
}