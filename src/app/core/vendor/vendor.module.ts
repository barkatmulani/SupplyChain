import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { VendorComponent } from "./vendor-detail/vendor-detail.component";
import { VendorListComponent } from "./vendor-list/vendor-list.component";
import { VendorService } from "../../services/common.services";
import { VendorResolver } from "./vendor-detail/vendor-detail.resolver";
import { VendorListResolver } from "./vendor-list/vendor-list.resolver";
import { StoreModule } from "@ngrx/store";
import { vendorListReducer } from "./vendor-list/store/vendor-list.reducer";

const routes: Routes = [
    { path: 'vendors/:pageNo', component: VendorListComponent, resolve: { resolvedVendorList: VendorListResolver } },
    { path: 'vendors', component: VendorListComponent, resolve: { resolvedVendorList: VendorListResolver } },
    { path: 'vendor', children: [
        { path: ':id/:pageNo', component: VendorComponent, resolve: { resolvedVendor: VendorResolver } },
        { path: ':id', component: VendorComponent, resolve: { resolvedVendor: VendorResolver } },
        { path: '', component: VendorComponent, resolve: { resolvedVendor: VendorResolver } },
    ]}
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('vendorList', vendorListReducer)
    ],
    declarations: [
        VendorComponent,
        VendorListComponent
    ],
    providers: [
        VendorService,
        VendorResolver,
        VendorListResolver
    ]
})

export class VendorModule { }