import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InventoryListComponent } from "./components/inventory-list/inventory-list.component";
import { InventoryComponent } from "./components/inventory-detail/inventory-detail.component";
import { SharedModule } from "../../shared/shared.module";
import { InventoryService } from "../../services/common.services";
import { InventoryResolver } from "./components/inventory-detail/inventory-detail.resolver";
import { StoreModule } from "@ngrx/store";
import { InventoryReducer } from "./store/inventory.reducer";
import { InventoryListResolver } from "./components/inventory-list/inventory-list.resolver";
import { DirtyRecordGuard } from "../../guards/dirty-record-guard";
import { InventoryEffects } from './store/inventory.effects';
import { EffectsModule } from "@ngrx/effects";

const routes: Routes = [
    { path: 'inventories', component: InventoryListComponent, resolve: { resolvedInventoryList: InventoryListResolver } },
    { path: 'inventory/:id', component: InventoryComponent, resolve: { resolvedInventory: InventoryResolver }, canDeactivate: [DirtyRecordGuard] },
    { path: 'inventory', pathMatch: "full", component: InventoryComponent, canDeactivate: [DirtyRecordGuard] },
    { path: 'showInventory/:id', component: InventoryComponent, resolve: { resolvedInventory: InventoryResolver }, outlet: 'detail', canDeactivate: [DirtyRecordGuard] },
    { path: 'showInventory', pathMatch: "full", component: InventoryComponent, outlet: 'detail', canDeactivate: [DirtyRecordGuard] },
];

@NgModule({
    imports: [
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
        InventoryResolver,
        InventoryListResolver
    ]
})

export class InventoryModule { }