import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgTableComponent } from './shared.components/datatable/table/ng-table.component';
import { NgTableRowDetailComponent } from './shared.components/datatable/table/ng-table-rowdetail.component';
import { NgTableImageLinkComponent } from './shared.components/datatable/table/ng-table-imagelink.component';
import { NgTableFilteringDirective } from './shared.components/datatable/table/ng-table-filtering.directive';
import { NgTablePagingDirective } from './shared.components/datatable/table/ng-table-paging.directive';
import { NgTableSortingDirective } from './shared.components/datatable/table/ng-table-sorting.directive';
import { InfoPopupComponent } from './shared.components/infopopup.component/infopopup.component';
import { DropdownComponent } from './shared.components/dropdown.component/dropdown.component';
import { ItemsPerPageSelectorComponent } from './shared.components/datatable/itemsPerPageSelector/itemsPerPageSelector'
import { PipesModule } from './pipes.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        PipesModule
    ],
    declarations: [
        NgTableComponent,
        NgTableRowDetailComponent,
        NgTableImageLinkComponent,
        NgTableFilteringDirective,
        NgTablePagingDirective,
        NgTableSortingDirective,
        InfoPopupComponent,
        DropdownComponent,
        ItemsPerPageSelectorComponent
    ],
    exports: [
        NgTableComponent,
        NgTableRowDetailComponent,
        NgTableImageLinkComponent,
        NgTableFilteringDirective,
        NgTablePagingDirective,
        NgTableSortingDirective,
        InfoPopupComponent,
        DropdownComponent
    ]
})
export class SharedModule {
}
