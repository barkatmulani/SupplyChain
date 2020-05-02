import { NgModule } from '@angular/core';

import { PurchaseOrderComponent } from './core/purchaseorder-detail/purchaseorder-detail.component';
import { PurchaseOrderListComponent } from './core/purchaseorder-list/purchaseorder-list.component';
import { ReceiptListComponent } from './core/receipt-list/receipt-list.component';
import { ReceiptComponent } from './core/receipt/receipt.component';
import { HomepageModule } from './core/homepage/homepage.module';
import { ItemModule } from './core/item/item.module';
import { RouterModule, Routes } from '@angular/router';
import { InventoryModule } from './core/inventory/inventory.module';
import { VendorModule } from './core/vendor/vendor.module';

const appRoutes: Routes = [

  /***** Purchase Order *****/
  { path: 'purchaseorder-list/:pageNo', component: PurchaseOrderListComponent, data: { mode: 'L' } },
  { path: 'purchaseorder-list', component: PurchaseOrderListComponent, data: { mode: 'L' } },
  { path: 'purchaseorder/:id/:pageNo', component: PurchaseOrderComponent },
  { path: 'purchaseorder/:id', component: PurchaseOrderComponent },
  { path: 'purchaseorder', component: PurchaseOrderComponent },
  
  /***** Post Purchase Order *****/
  { path: 'purchaseorder-post/:pageNo', component: PurchaseOrderListComponent, data: { mode: 'P' } },
  { path: 'purchaseorder-post', component: PurchaseOrderListComponent, data: { mode: 'P' } },
  { path: 'purchaseorder/:id/:pageNo', component: PurchaseOrderComponent },
  { path: 'purchaseorder/:id', component: PurchaseOrderComponent },
  { path: 'purchaseorder', component: PurchaseOrderComponent },

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
    PurchaseOrderComponent,
    PurchaseOrderListComponent,
    ReceiptComponent,
    ReceiptListComponent
  ],
  imports: [
    HomepageModule,
    ItemModule,
    InventoryModule,
    VendorModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }, // <-- debugging purposes only
    ),
  ],
  exports: [
    PurchaseOrderComponent,
    PurchaseOrderListComponent,
    ReceiptComponent,
    RouterModule,
    ReceiptListComponent,
    HomepageModule,
    ItemModule
  ]
})

export class AppRoutingModule { }
