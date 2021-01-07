import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as authActions from './store/auth.actions';
import { AuthSelectors } from './store/auth.selectors';

@Injectable()
export class AuthService {
  //user: Observable<firebase.default.User>;

  constructor(private firebaseAuth: AngularFireAuth,
              private store: Store,
              private router: Router) {
    //this.user = firebaseAuth.authState;
  }

  public googleAuth(): Observable<any> {
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  authLogin(provider): Observable<any> {
    this.store.select(AuthSelectors.getUser)
      .subscribe(user => {
        if (user) {
          this.router.navigate(['homepage']);
        }
        else {
          const credential = this.getCredentials(provider);
        }
      });

    return of({});
  }

  async getCredentials(provider: any) {
    return await this.firebaseAuth.signInWithPopup(provider)
      .then((result: any) => {
        this.store.dispatch(new authActions.LoginSuccess({displayName: result.user.displayName, email: result.user.email}));
        console.log('You have been successfully logged in!');
        this.router.navigate(['homepage']);
      }).catch((error) => {
        console.log(error)
      });
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
          console.log('Success!', value);
        })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth

      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  async logout() {
    await this.firebaseAuth.signOut();
  }

}
