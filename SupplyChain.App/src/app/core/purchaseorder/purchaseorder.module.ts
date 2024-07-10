import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PurchaseOrderComponent } from './components/purchaseorder-detail/purchaseorder-detail.component';
import { PurchaseOrderListComponent } from './components/purchaseorder-list/purchaseorder-list.component';
import { SharedModule } from "../../shared/shared.module";
import { PurchaseOrderService } from "../../services/common.services";
import { PurchaseOrderResolver } from "./components/purchaseorder-detail/purchaseorder-detail.resolver";
import { StoreModule } from "@ngrx/store";
import { PurchaseOrderReducer } from "./store/purchaseorder.reducer";
import { PurchaseOrderListResolver } from "./components/purchaseorder-list/purchaseorder-list.resolver";
import { DirtyRecordGuard } from "../../guards/dirty-record.guard";
import { PurchaseOrderEffects } from './store/purchaseorder.effects';
import { EffectsModule } from "@ngrx/effects";
import { LayoutComponent } from "../layout/layout.component";

const routes: Routes = [{
    path: 'purchaseorder',
    component: LayoutComponent,
    canActivate: [],
    children: [
      { path: ':mode', canActivate: [], component: PurchaseOrderListComponent, resolve: { resolvedPurchaseOrderList: PurchaseOrderListResolver } },
      { path: 'edit/:id', canActivate: [], component: PurchaseOrderComponent, resolve: { resolvedPurchaseOrder: PurchaseOrderResolver }, canDeactivate: [DirtyRecordGuard] },
      { path: 'edit', canActivate: [], pathMatch: "full", component: PurchaseOrderComponent, canDeactivate: [DirtyRecordGuard] },
      { path: 'view', canActivate: [], component: PurchaseOrderListComponent,
          children: [
            { path: ':id', component: PurchaseOrderComponent, resolve: { resolvedPurchaseOrder: PurchaseOrderResolver }, outlet: 'detail', canDeactivate: [DirtyRecordGuard] },
            { path: '', pathMatch: 'full', component: PurchaseOrderComponent, outlet: 'detail', canDeactivate: [DirtyRecordGuard] }
          ]
      }
    ]
  }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('purchaseOrder', PurchaseOrderReducer),
        EffectsModule.forFeature(
            [ PurchaseOrderEffects ]
        ),
    ],
    declarations: [
        PurchaseOrderComponent,
        PurchaseOrderListComponent
    ],
    providers: [
        PurchaseOrderService,
        PurchaseOrderResolver,
        PurchaseOrderListResolver
    ]
})

export class PurchaseOrderModule { }
