import { NgModule } from "@angular/core";
import { CommonModule, CurrencyPipe, DecimalPipe, DatePipe } from "@angular/common";

import { OrderByPipe } from "./pipes/orderbypipe";
import { SortPipe } from './pipes/sortpipe';
import { FormatPipe } from './pipes/formatpipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        OrderByPipe,
        SortPipe,
        FormatPipe
    ],
    exports: [
        OrderByPipe,
        SortPipe,
        FormatPipe
    ],
    providers: [
        CurrencyPipe,
        DecimalPipe,
        DatePipe
    ]
})

export class PipesModule {
    constructor() {
    }
}