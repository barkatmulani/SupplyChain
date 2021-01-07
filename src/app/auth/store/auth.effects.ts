import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as authActions from './auth.actions';
import { AuthService } from '../auth.service';
import { AuthActionTypes } from './auth.constants';

@Injectable()
export class AuthEffects {

  constructor(private authService: AuthService,
              private actions$: Actions) { }

  // @Effect()
  // login$: Observable<Action> = this.actions$.pipe(
  //   ofType(AuthActionTypes.Login),
  //   map((action: authActions.Login) => action.payload),
  //   mergeMap((user: any) =>
  //     this.authService.authLogin(user).pipe(
  //       map(user => new authActions.LoginSuccess(user)),
  //       catchError(err => of(new authActions.SetError(err)))
  //     )
  //   )
  // );
}
