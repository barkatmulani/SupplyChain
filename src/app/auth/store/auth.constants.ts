export enum AuthActionTypes {
  Login = '[Base] Login',
  LoginSuccess = '[Base] Login Success',
  Logout = '[Base] Logout',
  LogoutSuccess = '[Base] Logout Success',
  SetError = '[Base] Set Error',
  ResetError = '[Base] Reset Error'
}

export interface AuthState {
  user: any;
  loginTime?: Date;
}

export const authInitialState: AuthState = {
  user: null,
  loginTime: null
}
