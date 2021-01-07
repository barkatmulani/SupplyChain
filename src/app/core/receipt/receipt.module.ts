import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReceiptComponent } from './components/receipt-detail/receipt-detail.component';
import { ReceiptListComponent } from './components/receipt-list/receipt-list.component';
import { SharedModule } from "../../shared/shared.module";
import { ReceiptService, PurchaseOrderItemService } from "../../services/common.services";
import { ReceiptResolver } from "./components/receipt-detail/receipt-detail.resolver";
import { StoreModule } from "@ngrx/store";
import { ReceiptReducer } from "./store/receipt.reducer";
import { ReceiptListResolver } from "./components/receipt-list/receipt-list.resolver";
import { DirtyRecordGuard } from "../../guards/dirty-record.guard";
import { ReceiptEffects } from './store/receipt.effects';
import { EffectsModule } from "@ngrx/effects";
import { AuthModule } from "../../auth/auth.module";
import { AuthGuard } from "../../auth/auth.guard";
import { LayoutComponent } from "../layout/layout.component";

const routes: Routes = [{
    path: 'receipt',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
        { path: ':mode', component: ReceiptListComponent, resolve: { resolvedReceiptList: ReceiptListResolver } },
        { path: 'edit/:id', component: ReceiptComponent, resolve: { resolvedReceipt: ReceiptResolver }, canDeactivate: [DirtyRecordGuard] },
        { path: 'edit', pathMatch: "full", component: ReceiptComponent, resolve: { resolvedReceipt: ReceiptResolver }, canDeactivate: [DirtyRecordGuard] },
        { path: 'view', component: ReceiptListComponent,
            children: [
              { path: ':id', component: ReceiptComponent, resolve: { resolvedReceipt: ReceiptListResolver }, outlet: 'detail', canDeactivate: [DirtyRecordGuard] },
              { path: '', pathMatch: 'full', component: ReceiptComponent, outlet: 'detail', canDeactivate: [DirtyRecordGuard] }
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
        StoreModule.forFeature('receipt', ReceiptReducer),
        EffectsModule.forFeature(
            [ ReceiptEffects ]
        ),
    ],
    declarations: [
        ReceiptComponent,
        ReceiptListComponent
    ],
    providers: [
        ReceiptService,
        ReceiptResolver,
        ReceiptListResolver,
        PurchaseOrderItemService
    ]
})

export class ReceiptModule { }
