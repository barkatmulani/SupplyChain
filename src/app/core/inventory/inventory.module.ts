import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { InventoryListComponent } from "./inventory-list/inventory-list.component";
import { InventoryComponent } from "./inventory-detail/inventory-detail.component";
import { InventoryService } from "../../services/common.services";

const routes: Routes = [
    { path: 'inventories/:pageNo', component: InventoryListComponent },
    { path: 'inventories', component: InventoryListComponent },
        { path: 'item', children: [
            { path: 'inventory/:id/:pageNo', component: InventoryComponent },
            { path: 'inventory/:id', component: InventoryComponent },
            { path: 'inventory', component: InventoryComponent },
        ]
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        InventoryComponent,
        InventoryListComponent
    ],
    providers: [
        InventoryService
    ]
})

export class InventoryModule { }