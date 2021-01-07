import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InventoryListComponent } from "./components/inventory-list/inventory-list.component";
import { InventoryComponent } from "./components/inventory-detail/inventory-detail.component";
import { SharedModule } from "../../shared/shared.module";
import { InventoryService } from "../../services/common.services";
import { InventoryResolver } from "./components/inventory-detail/inventory-detail.resolver";
import { StoreModule } from "@ngrx/store";
import { InventoryReducer } from "./store/inventory.reducer";
import { DirtyRecordGuard } from "../../guards/dirty-record.guard";
import { InventoryEffects } from './store/inventory.effects';
import { EffectsModule } from "@ngrx/effects";
import { LayoutComponent } from "../layout/layout.component";
import { AuthModule } from "../../auth/auth.module";
import { AuthGuard } from "../../auth/auth.guard";

const routes: Routes = [{
    path: 'inventory',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
        { path: '', component: InventoryListComponent },
        { path: 'edit/:id', component: InventoryComponent, resolve: { resolvedInventory: InventoryResolver }, canDeactivate: [DirtyRecordGuard] },
        { path: 'edit', pathMatch: "full", component: InventoryComponent, canDeactivate: [DirtyRecordGuard] },
        { path: 'view', component: InventoryListComponent,
            children: [
              { path: ':id', component: InventoryComponent, resolve: { resolvedInventory: InventoryResolver }, outlet: 'detail', canDeactivate: [DirtyRecordGuard] },
              { path: '', pathMatch: 'full', component: InventoryComponent, outlet: 'detail', canDeactivate: [DirtyRecordGuard] }
            ]
        }
      ]
  }
];

@NgModule({
    imports: [
        AuthModule,
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('inventory', InventoryReducer),
        EffectsModule.forFeature(
            [ InventoryEffects ]
        ),
    ],
    declarations: [
        InventoryComponent,
        InventoryListComponent
    ],
    providers: [
        InventoryService,
        InventoryResolver
    ]
})

export class InventoryModule { }
