import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TableComponent } from './datatable/table.component';
import { NgTableComponent } from './datatable/table/ng-table.component';
import { NgTableRowDetailComponent } from './datatable/table/ng-table-rowdetail.component';
import { NgTableImageLinkComponent } from './datatable/table/ng-table-imagelink.component';
import { NgTableFilteringDirective } from './datatable/table/ng-table-filtering.directive';
import { NgTablePagingDirective } from './datatable/table/ng-table-paging.directive';
import { NgTableSortingDirective } from './datatable/table/ng-table-sorting.directive';
//import { InfoPopupComponent } from './infopopup.component/infopopup.component';
import { DropdownComponent } from './dropdown.component/dropdown.component';
import { recordsPerPageSelectorComponent } from './datatable/recordsPerPageSelector/recordsPerPageSelector';
import { PipesModule } from '../pipes.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { DialogComponent } from './dialog/dialog.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SwitchComponent } from '../shared/switch/switch.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CommandPanel } from './command-panel/command-panel.component';

@NgModule({
    imports: [
        PaginationModule.forRoot(),
        FormsModule,
        PipesModule,
        BrowserModule,
        NgSelectModule,
        ReactiveFormsModule
    ],
    declarations: [
        TableComponent,
        NgTableComponent,
        NgTableRowDetailComponent,
        NgTableImageLinkComponent,
        NgTableFilteringDirective,
        NgTablePagingDirective,
        NgTableSortingDirective,
        //InfoPopupComponent,
        DropdownComponent,
        recordsPerPageSelectorComponent,
        ConfirmationComponent,
        DialogComponent,
        LoadingSpinnerComponent,
        SwitchComponent,
        CommandPanel
    ],
    exports: [
        FormsModule,
        PipesModule,
        BrowserModule,
        NgSelectModule,
        ReactiveFormsModule,
        NgbModal,

        TableComponent,
        NgTableComponent,
        NgTableRowDetailComponent,
        NgTableImageLinkComponent,
        NgTableFilteringDirective,
        NgTablePagingDirective,
        NgTableSortingDirective,
        //InfoPopupComponent,
        DropdownComponent,
        ConfirmationComponent,
        NgSelectModule,
        DialogComponent,
        LoadingSpinnerComponent,
        SwitchComponent,
        CommandPanel
    ]
})
export class SharedModule {
}
