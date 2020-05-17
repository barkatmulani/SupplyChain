import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VendorListComponent } from "./components/vendor-list/vendor-list.component";
import { VendorComponent } from "./components/vendor-detail/vendor-detail.component";
import { SharedModule } from "../../shared/shared.module";
import { VendorService } from "../../services/common.services";
import { VendorResolver } from "./components/vendor-detail/vendor-detail.resolver";
import { StoreModule } from "@ngrx/store";
import { VendorReducer } from "./store/vendor.reducer";
import { DirtyRecordGuard } from "../../guards/dirty-record-guard";
import { VendorEffects } from './store/vendor.effects';
import { EffectsModule } from "@ngrx/effects";

const routes: Routes = [
    { path: 'vendors', component: VendorListComponent },
    { path: 'vendor/:id', component: VendorComponent, resolve: { resolvedVendor: VendorResolver }, canDeactivate: [DirtyRecordGuard] },
    { path: 'vendor', pathMatch: "full", component: VendorComponent, canDeactivate: [DirtyRecordGuard] },
    { path: 'showVendor/:id', component: VendorComponent, resolve: { resolvedVendor: VendorResolver }, outlet: 'detail', canDeactivate: [DirtyRecordGuard] },
    { path: 'showVendor', pathMatch: "full", component: VendorComponent, outlet: 'detail', canDeactivate: [DirtyRecordGuard] },
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('vendor', VendorReducer),
        EffectsModule.forFeature(
            [ VendorEffects ]
          ),
    ],
    declarations: [
        VendorComponent,
        VendorListComponent
    ],
    providers: [
        VendorService,
        VendorResolver
    ]
})

export class VendorModule { }