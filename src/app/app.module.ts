import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule, Routes } from '@angular/router';
import { PaginationModule, PaginationConfig } from 'ng2-bootstrap';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms'

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared.components/header.component/header.component';

import { MainMenuComponent } from './app.components/mainmenu.component/mainmenu.component';
import { ItemComponent } from './app.components/item.component/item.component';
import { ItemListComponent } from './app.components/itemlist.component/itemlist.component';
import { SharedModule } from './shared.module';
import { PipesModule } from './pipes.module';
import { RestangularModule } from 'ngx-restangular';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: 'itemlist', component: ItemListComponent },
  { path: 'item/:id', component: ItemComponent },
  { path: '**', component: MainMenuComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    HeaderComponent,
    ItemComponent,
    ItemListComponent
  ],
  imports: [
    FormsModule,
    PaginationModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
    PipesModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }, // <-- debugging purposes only
    ),
    // RestangularModule.forRoot((RestangularProvider) => {
    //   RestangularProvider.setBaseUrl('http://localhost:2020/SCMS/api');
    //   RestangularProvider.setDefaultHeaders({'Authorization': 'Bearer UDXPx-Xko0w4BRKajozCVy20X11MRZs1'});
    // })
  ],
  providers: [{provide: PaginationConfig, useValue: { boundaryLinks: true,  firstText: 'First', previousText: '&lsaquo;', nextText: '&rsaquo;', lastText: 'Last', maxSize: 1 }}],
  bootstrap: [AppComponent]
})
export class AppModule { }
