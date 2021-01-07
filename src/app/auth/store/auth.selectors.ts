import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.constants";

export const AuthSelector = createFeatureSelector<AuthState>('auth');

export class AuthSelectors {
  static getUser = createSelector(
    AuthSelector,
    state => state.user
  );

  static getLoginTime = createSelector(
    AuthSelector,
    state => state.loginTime
  );
}
