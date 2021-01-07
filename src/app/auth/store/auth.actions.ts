import { Action } from '@ngrx/store';
import { AuthActionTypes } from './auth.constants';

export class Login implements Action {
    readonly type = AuthActionTypes.Login;

    constructor(public payload: string) { }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: any) { }
}

export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;
}

export class LogoutSuccess implements Action {
  readonly type = AuthActionTypes.LogoutSuccess;
}

export class SetError implements Action {
  readonly type = AuthActionTypes.SetError

  constructor(public payload: any) { }
}

export class ResetError implements Action {
  readonly type = AuthActionTypes.ResetError
}

export type AuthActions = Login | LoginSuccess | Logout | LogoutSuccess;
