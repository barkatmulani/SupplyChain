import { Component, OnInit } from '@angular/core';
import { Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, Router } from '@angular/router';
import { slideInAnimation } from './app.animations';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RecordSelectors } from './store/record.selectors';
import { ToastrService } from 'ngx-toastr';
import { LoadItemList } from './core/item/store/item.actions';
import { filter } from 'rxjs/operators';
import * as recordActions from './store/record.actions';
import { LoadInventoryList } from './core/inventory/store/inventory.actions';
import { LoadVendorList } from './core/vendor/store/vendor.actions';

@Component({
  selector: 'app-root',
  moduleId: module.id,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  title = 'Supply Chain Management System';
  loading: boolean;
  error$: Subscription;
  history$: Subscription;

  constructor(private router: Router,
              private toastr: ToastrService,
              private store: Store) {
  }

  ngOnInit() {
    this.router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({urlAfterRedirects}: NavigationEnd) => {
        this.store.dispatch(new recordActions.AddToNavigationHistory(urlAfterRedirects.substr(1, urlAfterRedirects.length - 1)));
      });

    this.store.dispatch(new LoadItemList());
    this.store.dispatch(new LoadInventoryList());
    this.store.dispatch(new LoadVendorList());

    this.error$ = this.store.pipe(select(RecordSelectors.getError)).subscribe(
      (error: any) => {
          if(error && !this.toastr.currentlyActive)
          this.toastr.error(error.message, 'Error!');
      });
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
