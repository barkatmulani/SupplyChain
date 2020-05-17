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
import { DirtyRecordGuard } from "../../guards/dirty-record-guard";
import { ReceiptEffects } from './store/receipt.effects';
import { EffectsModule } from "@ngrx/effects";

const routes: Routes = [
    { path: 'receipts/:mode', component: ReceiptListComponent, resolve: { resolvedReceiptList: ReceiptListResolver } },
    { path: 'receipt/:id', component: ReceiptComponent, resolve: { resolvedReceipt: ReceiptResolver }, canDeactivate: [DirtyRecordGuard] },
    { path: 'receipt', pathMatch: "full", component: ReceiptComponent, resolve: { resolvedReceipt: ReceiptResolver }, canDeactivate: [DirtyRecordGuard] },
    { path: 'showreceipt/:id', component: ReceiptComponent, resolve: { resolvedReceipt: ReceiptResolver }, outlet: 'detail', canDeactivate: [DirtyRecordGuard] },
    { path: 'showreceipt', pathMatch: "full", component: ReceiptComponent, outlet: 'detail', canDeactivate: [DirtyRecordGuard] },
];

@NgModule({
    imports: [
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