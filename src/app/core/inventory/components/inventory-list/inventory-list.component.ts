import { Component, OnInit, OnChanges, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Global } from '../../../../../global';
import { ToastrService } from 'ngx-toastr';
import { Store, select } from '@ngrx/store';
import * as inventoryActions from '../../store/inventory.actions';
import { inventorySelectors } from '../../store/inventory.selectors'
import { BaseListComponent } from '../../../base/base-list/base-list.component';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ConfirmationService } from '../../../../services/confirmation.service';


@Component({
  moduleId: module.id,
  templateUrl: './inventory-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InventoryListComponent extends BaseListComponent implements OnInit {
  rows$: Observable<Array<any>>;

  columns: Array<any> = [
    { key: 'E', tooltip: 'Edit Inventory', imageUrl: 'assets/edit.png', width: '40px' },
    { key: 'D', tooltip: 'Delete Inventory', imageUrl: 'assets/delete3.png', width: '40px' },
    { title: 'Inventory Id', name: 'inventoryId', hidden: true },
    { title: 'Inventory Description', name: 'inventoryDescription' },
    // filtering: {filterString: '', placeholder: 'Filter by descriiption'}, sort: 'asc'},
    { title: 'Address', name: 'address' },
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
    super(route, router, toastr, store, inventorySelectors);
  }

  ngOnInit() {
    Global.stripFromUrl(4);

    this.rows$ = this.store.pipe(select(inventorySelectors.getInventories)).pipe(
      map((rows: any[]) => {
          const inventories = rows ? rows.map(inventory => ({...inventory, id: inventory.inventoryId })) : [];
          return inventories;
      })
    );
  }

  public onCellClick(data: any): any {
    if(!data.selectedId) {
      this.store.dispatch(new inventoryActions.UnselectInventory());
      this.router.navigate([{ outlets: { detail: null }}]);
    }
    else {
      this.store.dispatch(new inventoryActions.SelectInventory(data.selectedId));
      this.router.navigate([{ outlets: { detail: ['showInventory', data.selectedId] }}]);
    }
  }

  public onLinkClicked(data: any) {
    switch(data.name) {
      case 'E':
        if(this.navigationFlag)
          this.router.navigate([{ outlets: { primary: ['inventory', data.rowId] }, detail: null }]);
        else
          this.router.navigate([{ outlets: { detail: ['showInventory', data.rowId] }}]);
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
    this.store.dispatch(new inventoryActions.SetNavigationFlag(value));

    if(this.navigationFlag) {
      this.router.navigate([{ outlets: { detail: null }}]);
    }
  }

  public onAddClicked() {
    if(this.navigationFlag)
      this.router.navigate([{ outlets: { primary: 'inventory' }, detail: null }]);
    else
      this.router.navigate([{ outlets: { detail: 'showInventory' }}]);
  }

  public onDeleteConfirm(id: number) {
    this.store.dispatch(new inventoryActions.DeleteInventory(id));
  }

  public onChangeTable(config: any) {

  }

  public onPageChanged(data: any) {
    this.store.dispatch(new inventoryActions.SetPageNo(data.pageNo));
  }

  public onRecordsPerPageChanged(data: number) {
    this.store.dispatch(new inventoryActions.SetRecordsPerPage(data));
    this.store.dispatch(new inventoryActions.SetPageNo(1));
  }
}
