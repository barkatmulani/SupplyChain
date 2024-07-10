import { Component } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { slideInAnimation } from './app.animations';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RecordSelectors } from './store/record/record.selectors';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import * as recordActions from './store/record/record.actions';
@Component({
  selector: 'app-root',
  moduleId: module.id,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'Supply Chain Management System';

  subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private store: Store) {

  }

  ngOnInit() {
    this.subscriptions.push(
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((nav: any) => {
          const { urlAfterRedirects } = nav;
          console.log(urlAfterRedirects);
          this.store.dispatch(new recordActions.AddToNavigationHistory(urlAfterRedirects.substr(1, urlAfterRedirects.length - 1)));
        })
    );

    this.subscriptions.push(this.store.pipe(select(RecordSelectors.getError)).subscribe(
      (error: any) => {
          if(error && !this.toastr.currentlyActive)
          this.toastr.error(error.message, 'Error!');
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
