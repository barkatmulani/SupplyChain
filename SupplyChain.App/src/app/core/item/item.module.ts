import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ItemListComponent } from "./components/item-list/item-list.component";
import { ItemComponent } from "./components/item-detail/item-detail.component";
import { SharedModule } from "../../shared/shared.module";
import { ItemService } from "../../services/common.services";
import { ItemResolver } from "./components/item-detail/item-detail.resolver";
import { StoreModule } from "@ngrx/store";
import { ItemReducer } from "./store/item.reducer";
import { DirtyRecordGuard } from "../../guards/dirty-record.guard";
import { ItemEffects } from './store/item.effects';
import { EffectsModule } from "@ngrx/effects";
import { LayoutComponent } from "../layout/layout.component";

const routes: Routes = [
  {
    path: 'item',
    component: LayoutComponent,
    canActivate: [],
    children: [
      { path: '', canActivate: [], pathMatch: 'full', component: ItemListComponent },
      { path: 'edit/:id', canActivate: [], component: ItemComponent, resolve: { resolvedItem: ItemResolver }, canDeactivate: [DirtyRecordGuard] },
      { path: 'edit', canActivate: [], pathMatch: "full", component: ItemComponent, canDeactivate: [DirtyRecordGuard] },
      { path: 'view', canActivate: [], component: ItemListComponent,
          children: [
            { path: ':id', component: ItemComponent, resolve: { resolvedItem: ItemResolver }, outlet: 'detail', canDeactivate: [DirtyRecordGuard] },
            { path: '', pathMatch: 'full', component: ItemComponent, outlet: 'detail', canDeactivate: [DirtyRecordGuard] }
          ]
      }
    ]
  },
  { path: 'showItem/:id', component: ItemComponent, resolve: { resolvedItem: ItemResolver }, outlet: 'detail', canDeactivate: [DirtyRecordGuard] },
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('item', ItemReducer),
        EffectsModule.forFeature(
            [ ItemEffects ]
          ),
    ],
    declarations: [
        ItemComponent,
        ItemListComponent
    ],
    providers: [
        ItemService,
        ItemResolver,
    ]
})

export class ItemModule { }
