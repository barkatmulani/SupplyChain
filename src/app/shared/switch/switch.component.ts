import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'cm-switch',
    templateUrl: 'switch.component.html',
    styleUrls: ['switch.component.css']
})
export class SwitchComponent {
    @Input() label: string;
    @Input() selected: boolean = true;

    @Output() onToggle: EventEmitter<boolean> = new EventEmitter();

    onChange(e) {
        this.onToggle.emit(this.selected);
    }
}