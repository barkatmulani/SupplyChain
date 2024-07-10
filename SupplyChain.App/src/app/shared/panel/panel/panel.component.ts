import { Component, Input } from '@angular/core';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {
  @Input() heading: string;
  @Input() headingUrl: string = "";
  @Input() class: string = "";
  @Input() mainPanel: boolean = false;
}
