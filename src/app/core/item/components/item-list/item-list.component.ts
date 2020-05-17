import { Component, OnInit, OnChanges, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../store/item.actions';
import { ItemSelectors } from '../../store/item.selectors'
import { BaseListComponent } from '../../../base/base-list/base-list.component';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ConfirmationService } from '../../../../services/confirmation.service';

@Component({
  moduleId: module.id,
  templateUrl: './item-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ItemListComponent extends BaseListComponent implements OnInit {
  rows$: Observable<Array<any>>;

  columns: Array<any> = [
    { key: 'E', tooltip: 'Edit Item', imageUrl: 'assets/edit.png', width: '40px' },
    { key: 'D', tooltip: 'Delete Item', imageUrl: 'assets/delete3.png', width: '40px' },
    { title: 'Item Id', name: 'itemId', hidden: true },
    { title: 'Item Description', name: 'itemDescription' },
    // filtering: {filterString: '', placeholder: 'Filter by descriiption'}, sort: 'asc'},
    { title: 'Cost', name: 'cost' },
    { title: 'Price', name: 'price' },
  ];

  config: any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''}
  };

  constructor(router: Router,
              route: ActivatedRoute,
              toastr: ToastrService,
              store: Store,
              private confirmationService: ConfirmationService) {
    super(route, router, toastr, store, ItemSelectors);
  }

  ngOnInit() {
    //Global.stripFromUrl(4);

    this.rows$ = this.store.pipe(select(ItemSelectors.getItems)).pipe(
      map((rows: any[]) => {
          const items = rows ? rows.map(item => ({...item, id: item.itemId })) : [];
          return items;
      })
    );
  }

  public onCellClick(data: any): any {
    if(!data.selectedId) {
      this.store.dispatch(new itemActions.UnselectItem());
      this.router.navigate([{ outlets: { detail: null }}]);
    }
    else {
      this.store.dispatch(new itemActions.SelectItem(data.selectedId));
      this.router.navigate([{ outlets: { detail: ['showItem', data.selectedId] }}]);
    }
  }

  public onLinkClicked(data: any) {
    switch(data.name) {
      case 'E':
        if(this.navigationFlag)
          this.router.navigate([{ outlets: { primary: ['item', data.rowId] }, detail: null }]);
        else
          this.router.navigate([{ outlets: { detail: ['showItem', data.rowId] }}]);
        break;

      case 'D':
        let modal1 = this.confirmationService.openDeleteModal();
        modal1.result.then(null, result => {
          if(result) this.onDeleteConfirm(data.rowId);
        });
        break;
    }
  }

  onSwitchToggle(value) {
    this.store.dispatch(new itemActions.SetNavigationFlag(value));

    if(this.navigationFlag) {
      this.router.navigate([{ outlets: { detail: null }}]);
    }
  }

  onAddClicked() {
    if(this.navigationFlag)
      this.router.navigate([{ outlets: { primary: 'item' }, detail: null }]);
    else
      this.router.navigate([{ outlets: { detail: 'showItem' }}]);
  }

  onDeleteConfirm(id: number) {
    this.store.dispatch(new itemActions.DeleteItem(id));
  }

  onChangeTable(config: any) {

  }

  onPageChanged(data: any) {
    this.store.dispatch(new itemActions.SetPageNo(data.pageNo));
  }

  onRecordsPerPageChanged(data: number) {
    this.store.dispatch(new itemActions.SetRecordsPerPage(data));
    this.store.dispatch(new itemActions.SetPageNo(1));
  }
}
