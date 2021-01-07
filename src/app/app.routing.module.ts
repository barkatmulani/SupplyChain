import { NgModule } from '@angular/core';

import { ReceiptListComponent } from './core/receipt/components/receipt-list/receipt-list.component';
import { ReceiptComponent } from './core/receipt/components/receipt-detail/receipt-detail.component';
import { HomepageModule } from './core/homepage/homepage.module';
import { ItemModule } from './core/item/item.module';
import { RouterModule, Routes } from '@angular/router';
import { InventoryModule } from './core/inventory/inventory.module';
import { VendorModule } from './core/vendor/vendor.module';
import { PurchaseOrderModule } from './core/purchaseorder/purchaseorder.module';
import { ReceiptModule } from './core/receipt/receipt.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { LayoutComponent } from './core/layout/layout.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'homepage' },
  {
    path: '**',
    canActivate: [AuthGuard],
    component: LayoutComponent
  }
//  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    AuthModule,
    RouterModule.forChild(routes),
    ItemModule,
    InventoryModule,
    VendorModule,
    PurchaseOrderModule,
    ReceiptModule,
    RouterModule.forRoot(
      [],
      { enableTracing: false }, // <-- debugging purposes only
    ),
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
