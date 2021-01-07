import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { slideInAnimation } from './layout.animations';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RecordSelectors } from '../../store/record.selectors';
import { ToastrService } from 'ngx-toastr';
import { LoadItemList } from '../item/store/item.actions';
import { filter, take } from 'rxjs/operators';
import * as recordActions from '../../store/record.actions';
import { LoadInventoryList } from '../inventory/store/inventory.actions';
import { LoadVendorList } from '../vendor/store/vendor.actions';
import { LoadPurchaseOrderList } from '../purchaseorder/store/purchaseorder.actions';

@Component({
  moduleId: module.id,
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.css'],
  animations: [slideInAnimation]
})
export class LayoutComponent implements OnInit {
  loading: boolean;

  subscription: Subscription[] = [];

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(new LoadItemList());
    this.store.dispatch(new LoadInventoryList());
    this.store.dispatch(new LoadVendorList());
    this.store.dispatch(new LoadPurchaseOrderList());
  }

  checkRouterEvent(routerEvent: Event): void {
    // console.log(routerEvent)
    // const e: any = routerEvent;
    // if (e.url && e.url.substring(e.url.length - 1) !== 's') {

    //   if (routerEvent instanceof NavigationStart) {
    //     this.loading = true;
    //   }

    //   if (routerEvent instanceof NavigationEnd ||
    //     routerEvent instanceof NavigationCancel ||
    //     routerEvent instanceof NavigationError) {
    //       this.loading = false;
    //     }
    // }
  }
}
