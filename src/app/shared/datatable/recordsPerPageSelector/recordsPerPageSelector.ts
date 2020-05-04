import { Component, Output, EventEmitter, OnChanges, Input } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'recordsPerPageselector',
    moduleId: module.id,
    templateUrl: 'recordsPerPageSelector.html',
})

export class recordsPerPageSelectorComponent implements OnChanges {

    public recordsPerPageList: number[] = [10, 25, 50, 100];
    
    @Input() recordsPerPage: number = this.recordsPerPageList[0];
    @Output() recordsPerPageChanged: EventEmitter<any> = new EventEmitter();

    private currentSelection = 0;

    myValue: string;

    ngOnChanges() {
        if(this.recordsPerPage)
            this.currentSelection = this.recordsPerPageList.indexOf(this.recordsPerPage);
        else
            this.recordsPerPage = this.recordsPerPageList[this.currentSelection];
    }

    onClick(i: number) {
        this.currentSelection = i;
        this.recordsPerPage = this.recordsPerPageList[i];
        this.recordsPerPageChanged.emit(this.recordsPerPageList[i]);
    }
}
