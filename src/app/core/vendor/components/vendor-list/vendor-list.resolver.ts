import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from "@angular/router"
import { Injectable } from "@angular/core";
import { VendorService } from "../../../../services/common.services";
import { catchError, map, tap, take } from "rxjs/operators";
import { of, pipe } from "rxjs";
import { ResolvedVendorList, Vendor } from '../../../../models/vendor.model';
import { Store, select } from "@ngrx/store";
import { LoadVendorList } from "../../store/vendor.actions";
import { VendorSelectors } from "../../store/vendor.selectors";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root',
})
export class VendorListResolver implements Resolve<ResolvedVendorList> {
    vendorCount: number;

    constructor(private store: Store) { }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.store.pipe(select(VendorSelectors.getVendors)).subscribe(vendors => {
            this.vendorCount = vendors ? vendors.length : 0;
        });

        this.store.dispatch(new LoadVendorList());

        return of({ count: this.vendorCount });
    }
}