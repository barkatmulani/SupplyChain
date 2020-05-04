import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: 'command-panel',
    templateUrl: 'command-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandPanel {
    @Input() disabled: boolean;
    @Output() save = new EventEmitter();
    @Output() cancel = new EventEmitter();

    onSave() {
        this.save.emit(null);
    }

    onCancel() {
        this.cancel.emit(null);
    }
}