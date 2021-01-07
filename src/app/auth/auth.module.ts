import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AuthComponent } from "./components/auth.component";
import { AuthReducer } from "./store/auth.reducer";
import { AuthEffects } from "./store/auth.effects";
import { SharedModule } from "../shared/shared.module";
import { AuthService } from "./auth.service";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../../environments/environment";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
    { path: 'authentication', component: AuthComponent }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('auth', AuthReducer),
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
        EffectsModule.forFeature(
            [ AuthEffects ]
          ),
    ],
    declarations: [
        AuthComponent
    ],
    providers: [
        AuthService
    ],
    exports: [
        AuthGuard
    ]
})

export class AuthModule { }
