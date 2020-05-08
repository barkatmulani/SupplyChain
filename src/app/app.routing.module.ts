import { NgModule } from '@angular/core';

import { ReceiptListComponent } from './core/receipt-list/receipt-list.component';
import { ReceiptComponent } from './core/receipt/receipt.component';
import { HomepageModule } from './core/homepage/homepage.module';
import { ItemModule } from './core/item/item.module';
import { RouterModule, Routes } from '@angular/router';
import { InventoryModule } from './core/inventory/inventory.module';
import { VendorModule } from './core/vendor/vendor.module';
import { PurchaseOrderModule } from './core/purchaseorder/purchaseorder.module';

const appRoutes: Routes = [
  
  // /***** Post Purchase Order *****/
  // { path: 'purchaseorder-post/:pageNo', component: PurchaseOrderListComponent, data: { mode: 'P' } },
  // { path: 'purchaseorder-post', component: PurchaseOrderListComponent, data: { mode: 'P' } },
  // { path: 'purchaseorder/:id/:pageNo', component: PurchaseOrderComponent },
  // { path: 'purchaseorder/:id', component: PurchaseOrderComponent },
  // { path: 'purchaseorder', component: PurchaseOrderComponent },

  /***** Inventory Receipt *****/
  { path: 'receipt-list/:pageNo', component: ReceiptListComponent, data: { mode: 'L' } },
  { path: 'receipt-list', component: ReceiptListComponent, data: { mode: 'L' } },
  { path: 'receipt/:id/:pageNo', component: ReceiptComponent },
  { path: 'receipt/:id', component: ReceiptComponent },
  { path: 'receipt', component: ReceiptComponent },
  
  /***** Post Inventory Receipt *****/
  { path: 'receipt-post/:pageNo', component: ReceiptListComponent, data: { mode: 'P' } },
  { path: 'receipt-post', component: ReceiptListComponent, data: { mode: 'P' } },
  { path: 'receipt/:id/:pageNo', component: ReceiptComponent },
  { path: 'receipt/:id', component: ReceiptComponent },
  { path: 'receipt', component: ReceiptComponent },
];

@NgModule({
  declarations: [
    ReceiptComponent,
    ReceiptListComponent
  ],
  imports: [
    HomepageModule,
    ItemModule,
    InventoryModule,
    VendorModule,
    PurchaseOrderModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }, // <-- debugging purposes only
    ),
  ],
  exports: [
    ReceiptComponent,
    RouterModule,
    ReceiptListComponent,
    HomepageModule
  ]
})

export class AppRoutingModule { }
