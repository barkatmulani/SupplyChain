import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"
import { Injectable } from "@angular/core";
import { VendorService } from "../../../../services/common.services";
import { catchError, map, tap } from "rxjs/operators";
import { of } from "rxjs";
import { ResolvedVendor } from '../../../../models/Vendor.model';

@Injectable({
    providedIn: 'root',
})
export class VendorResolver implements Resolve<ResolvedVendor> {
    constructor(private VendorService: VendorService) { }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = +route.paramMap.get('id');

        if (isNaN(id)) {
            const message = 'Provided id ' + id + ' is not a number';
            return of({ vendor: null, error: message });
        }

        return this.VendorService.get(+id).pipe(
            map(vendor => ({ vendor })),
            catchError(error => {
              console.log(error);
              return of({ vendor: null, error});
            })
        );
    }
}