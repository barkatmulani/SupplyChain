import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from "@angular/router"
import { Injectable } from "@angular/core";
import { VendorService } from "../../../services/common.services";
import { catchError, map, tap, take } from "rxjs/operators";
import { of, pipe } from "rxjs";
import { ResolvedVendorList } from '../../../models/vendor.model';
import { Store } from "@ngrx/store";

@Injectable({
    providedIn: 'root',
})
export class VendorListResolver implements Resolve<ResolvedVendorList> {
    constructor(private vendorService: VendorService, private store: Store) { }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.vendorService.getAll().pipe(
            map(rows => {
                const vendors = rows.map(vendor => ({...vendor, id: vendor.vendorId }));
                return { vendors };
            }),
            catchError(error => {
                console.log(error);
                return of({ vendors: [], error });
            }));
        }
}