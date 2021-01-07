import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { AuthSelectors } from '../store/auth.selectors';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(private store: Store,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select(AuthSelectors.getUser)
        .subscribe(user => {
          console.log('User', user)
            if (user) {
              this.router.navigate(['homepage']);
            }
        })
    );
  }

  onLoginClicked() {
    this.authService.googleAuth();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
