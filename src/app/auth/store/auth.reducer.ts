import { AuthActionTypes, authInitialState } from './auth.constants';
import { AuthActions } from './auth.actions';

export function AuthReducer(state = authInitialState, action: AuthActions) {
  switch (action.type) {
        case AuthActionTypes.LoginSuccess:
            return {
                ...state,
                user: action.payload,
                loginTime: new Date()
            }

        case AuthActionTypes.LogoutSuccess:
            return {
                ...state,
                user: null,
                loginTime: null
            }

        default:
            return state;
    }
}
