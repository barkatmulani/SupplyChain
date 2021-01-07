import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthSelectors } from "./store/auth.selectors";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private store: Store, private router: Router){
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      await this.store.select(AuthSelectors.getUser)
        .subscribe(user => {
          console.log('User is ', user)
          if (!user) {
            this.router.navigate(['authentication']);
          }
        }
      );

      return true;
    }
}
