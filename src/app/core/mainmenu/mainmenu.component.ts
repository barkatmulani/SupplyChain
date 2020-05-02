import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/common.services';

@Component({
  selector: 'mainmenu',
  templateUrl: 'mainmenu.component.html',
  styleUrls: ['mainmenu.component.css']
})
export class MainMenuComponent implements OnInit {
  itemList: any[] = [];

  constructor() { }

  ngOnInit() {
    // this.itemService.getAll().subscribe(
    //   (data: any) => { this.itemList = data; },
    //   (error: any) => { console.log(error); },
    //   () => { console.log(this.itemList); this.spinnerService.hide(); });
  }
}
