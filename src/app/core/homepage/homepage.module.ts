import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "../layout/layout.component";
import { HomepageComponent } from "./homepage.component";

const routes: Routes = [
  {
    path: 'homepage',
    component: LayoutComponent,
    children: [
      { path: '', component: HomepageComponent },
  //  { path: '**', component: PageNotFoundComponent }
    ]
  }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [
        HomepageComponent
    ]
})

export class HomepageModule { }
