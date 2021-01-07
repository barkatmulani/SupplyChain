import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VendorListComponent } from "./components/vendor-list/vendor-list.component";
import { VendorComponent } from "./components/vendor-detail/vendor-detail.component";
import { SharedModule } from "../../shared/shared.module";
import { VendorService } from "../../services/common.services";
import { VendorResolver } from "./components/vendor-detail/vendor-detail.resolver";
import { StoreModule } from "@ngrx/store";
import { VendorReducer } from "./store/vendor.reducer";
import { DirtyRecordGuard } from "../../guards/dirty-record.guard";
import { VendorEffects } from './store/vendor.effects';
import { EffectsModule } from "@ngrx/effects";
import { AuthModule } from "../../auth/auth.module";
import { AuthGuard } from "../../auth/auth.guard";
import { LayoutComponent } from "../layout/layout.component";

const routes: Routes = [{
    path: 'vendor',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', component: VendorListComponent },
      { path: 'edit/:id', component: VendorComponent, resolve: { resolvedVendor: VendorResolver }, canDeactivate: [DirtyRecordGuard] },
      { path: 'edit', pathMatch: "full", component: VendorComponent, canDeactivate: [DirtyRecordGuard] },
      { path: 'view', component: VendorListComponent,
          children: [
            { path: ':id', component: VendorComponent, resolve: { resolvedVendor: VendorResolver }, outlet: 'detail', canDeactivate: [DirtyRecordGuard] },
            { path: '', pathMatch: 'full', component: VendorComponent, outlet: 'detail', canDeactivate: [DirtyRecordGuard] }
          ]
      }
    ]
  }
];

@NgModule({
    imports: [
        AuthModule,
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('vendor', VendorReducer),
        EffectsModule.forFeature(
          [ VendorEffects ]
        )
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
