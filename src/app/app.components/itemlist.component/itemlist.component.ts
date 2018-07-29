import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TableData } from './table-data';
import { Restangular } from 'ngx-restangular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
 
@Component({
  selector: 'itemlist',
  moduleId: module.id,
  templateUrl: 'itemlist.component.html'
})

export class ItemListComponent implements OnInit, OnChanges {
  public rows:Array<any> = [];// = TableData;
  // public data:Array<any>;

  public constructor(private router: Router,
                     //private restangular: Restangular,
                     private http:HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('http://localhost:2020/SCMS/api/item').subscribe((data: any) => {
      console.log(data);
      if(data.length > 0)
        this.rows = data;
      else
        this.rows.push(data);
    },
    error => {
      console.log(error);
    },
    () => {
      this.rows.forEach(x => x.id = x.ItemId)
      console.log('complete')
    });

    //this.data.forEach((row: any) => this.rows.push(Object.assign(row, { id: row.itemId })));
    // this.restangular.withConfig(function (RestangularConfigurer: any) {
    //     RestangularConfigurer.setBaseUrl('http://localhost:2020/SCMS/api/');
    // }).all('item').getList();
    
  }

  ngOnChanges(): void {
  }

  public columns:Array<any> = [
      { key: 'E', tooltip: 'Edit Item', imageUrl: 'assets/open-book.png' },
      { title: 'Item Id', name: 'ItemId' },
      { title: 'Item Description', name: 'ItemDescription' },
      //filtering: {filterString: '', placeholder: 'Filter by descriiption'}, sort: 'asc'},
      { title: 'Cost', name: 'Cost' },
      { title: 'Price', name: 'Price' },
  ];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  public onCellClick(data: any): any {
    console.log(data);
  }

  public onLinkClicked(data: any) {
    if(data.name === 'E') {
      this.router.navigate(['/item', data.rowId]);
    }
  }
}
