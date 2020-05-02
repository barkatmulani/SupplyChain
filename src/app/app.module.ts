import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
//import { PaginationModule, PaginationConfig } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PipesModule } from './pipes.module';
import { HeaderComponent } from './core/header/header.component';

import { MainMenuComponent } from './core/mainmenu/mainmenu.component';
import { MainMenuContainerComponent } from './core/mainmenu-container/mainmenu-container.component';
import { HomepageModule } from './core/homepage/homepage.module';
import { ItemModule } from './core/item/item.module';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { DirtyRecordGuard } from './guards/dirty-record-guard';
import { BaseDetailComponent } from './core/base/base-detail/base-detail.component';
import { EffectsModule } from '@ngrx/effects';
import { RecordListReducer } from './store/record.reducer';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    MainMenuContainerComponent,
    HeaderComponent,
    BaseDetailComponent
  ],
  imports: [
    FormsModule,
    //PaginationModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    PipesModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    HomepageModule,
    ItemModule,
    AppRoutingModule,
    NgbModule,
    SharedModule,
    PipesModule,
    StoreModule.forRoot({ base: RecordListReducer }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'SCMS DevTools',
      maxAge: 25,
      logOnly: environment.production
    }),
  ],
  providers: [DirtyRecordGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
