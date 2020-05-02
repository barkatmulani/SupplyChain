import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomepageComponent } from "./homepage.component";

const routes: Routes = [
    { path: 'homepage', component: HomepageComponent },
    { path: '', redirectTo: 'homepage', pathMatch: 'full' }
//  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [
        HomepageComponent
    ],
    exports: [
        HomepageComponent
    ]
})

export class HomepageModule { }