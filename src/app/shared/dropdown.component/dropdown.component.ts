import { Component, Input, Output, EventEmitter, forwardRef, OnChanges, OnInit } from '@angular/core';
import { TextValuePair } from './TextValuePair';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'dropdown',
    moduleId: module.id,
    templateUrl: 'dropdown.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => DropdownComponent)
        }
    ]
})

export class DropdownComponent implements OnChanges, ControlValueAccessor {
    selectedValue: any;

    @Input() title: string;
    @Input() showTooltip: boolean;
    @Input() disabled: boolean = false;
    @Input() showLabel: boolean = false;
    @Input() items: TextValuePair[] = [new TextValuePair('', '', '')];
    @Input() hideIds: number[];
    @Output() onSelected: EventEmitter<string> = new EventEmitter();

    ngOnChanges() {
        //console.log('Hide Ids', this.items, this.hideIds)
    }

    onChanged(value: any): void {
        console.log('Value changed to ', value)
        this.value = value;
        this.propagateChange(value);
    }

    writeValue(obj: any): void {
        if(!obj)
            this.selectedValue = null
        else if(isNaN(obj))
            this.selectedValue = obj;
        else
            this.selectedValue = this.getValueFromList(obj);
    }

    registerOnChange(fn: any): void {
        this.onChanged = fn;
    }
    
    registerOnTouched(fn: any): void {

    }

    propagateChange = (_: any) => { };

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    get value(): any {
        return this.selectedValue ? this.selectedValue.value : -1;
    }

    set value(v: any) {
        if (v && (!this.selectedValue || v !== this.selectedValue.value)) {
            this.selectedValue = this.getValueFromList(v);
            this.onSelected.emit(v);
        }
    }

    get tooltip(): string {
        return this.selectedValue ? this.selectedValue.tooltip : '';
    }

    private getValueFromList(obj: any) {
        return this.items && this.items.length
                ? this.items.find(x => x.value == obj)
                : null;
    }

    getItems() {
        let val = this.items.filter(r => {
            let v = parseInt(r.value);
            let i = this.hideIds.indexOf(v)
            console.log(i)
            return i < 0
        });
        console.log(val, this.hideIds);
        return val;
    }
}
