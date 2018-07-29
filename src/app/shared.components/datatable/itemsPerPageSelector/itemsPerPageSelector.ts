import { Component, Output, EventEmitter, OnChanges } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";

@Component({
    selector: "itemsperpageselector",
    moduleId: module.id,
    templateUrl: "itemsPerPageSelector.html",
})

export class ItemsPerPageSelectorComponent {

    @Output() itemsPerPageChanged: EventEmitter<any> = new EventEmitter();

    private currentSelection: number = 0;
    private itemsPerPageList: number[] = [10, 25, 50, 100];
    public itemsPerPage: number = this.itemsPerPageList[0];

    myValue: string;

    ngOnChanges() {
        this.itemsPerPage = this.itemsPerPageList[this.currentSelection];
    }

    onClick(i: number) {
        this.currentSelection = i;
        this.itemsPerPage = this.itemsPerPageList[i];
        this.itemsPerPageChanged.emit(this.itemsPerPageList[i]);
    }
}
