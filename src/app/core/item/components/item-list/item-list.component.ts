import { Component, OnInit, OnChanges, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Global } from '../../../../../global';
import { ToastrService } from 'ngx-toastr';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../store/item.actions';
import { ConfirmationComponent } from '../../../../shared/confirmation/confirmation.component';
import { itemSelectors } from '../../store/item.selectors'
import { BaseListComponent } from '../../../base/base-list/base-list.component';


@Component({
  moduleId: module.id,
  templateUrl: './item-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ItemListComponent extends BaseListComponent implements OnInit, OnChanges {
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

  @ViewChild('deleteconfirmation') deleteconfirmation: ConfirmationComponent;

  constructor(router: Router,
              route: ActivatedRoute,
              toastr: ToastrService,
              store: Store) {
    super(route, router, itemActions, 'items', toastr, store, itemSelectors);
  }

  ngOnInit() {
    Global.stripFromUrl(4);

    // this.rows$ = this.route.data.pipe(
    //   tap(data => {
    //       if(data.resolvedItemList.error) {
    //           this.toastr.error(data.resolvedItemList.error, 'Error!');                    
    //       };
    //       this.hasData = (data && data.length > 0);
    //   }),
    //   map(data => data.resolvedItemList.items),
    //   catchError(e => {
    //       this.toastr.error(e.message, 'Error!');
    //       return of({e});
    //   })
    // );


    // this.rows$ = this.route.data.pipe(
    //   tap(data => this.hasData = data.length),
    //   map(data => (data.resolvedItemList.items))
    // );

    // this.pageNo$ = this.store.pipe(select(itemSelectors.getPageNo));

    // this.navigationFlag$ = this.store.pipe(select(itemSelectors.navigationFlag))
    //     .subscribe(navigationFlag => this.navigationFlag = navigationFlag)

    // this.recordUpdated$ = this.store.pipe(select(itemSelectors.updatedItem)).subscribe(
    //     record => {
    //     if (record) {
    //         this.store.dispatch(new ResetUpdatedItem());
    //         this.toastr.success(`Record ${record.id === 0 ? 'added' : 'saved'} successfully`, 'Success!');
    //     }}
    // );

    // this.error$ = this.store.pipe(select(itemSelectors.error)).subscribe(
    //     error => {
    //       console.log(error);
    //         if(error && !this.toastr.currentlyActive)
    //           this.toastr.error(error.message, 'Error!');
    //     }
    // );

    // this.rows$ = combineLatest([
    //   this.store.pipe(select(itemSelectors.getItems)),
    //   this.itemService.getAll().pipe(
    //     tap(rows => {
    //       this.hasData = (rows.length > 0)
    //     }),
    //     map(rows =>
    //       rows.map(row => ({...row, id: row.itemId }))
    //     ),
    //     catchError(error => {
    //       console.log(error);
    //       this.hasData = false; 
    //       return EMPTY;
    //     }))
    // ]).pipe(map(([items1, items2]) => {
    //   if(!items1.length) this.store.dispatch(new SetItems(items2));
    //   return items1.length ? items1 : items2;
    // }));
  }

  ngOnDestroy() {
    super.destroy();
    // if(this.navigationFlag$) this.navigationFlag$.unsubscribe();
    // if(this.recordUpdated$) this.recordUpdated$.unsubscribe();
    // if(this.error$) this.error$.unsubscribe();
  }

  ngOnChanges(): void {
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
        this.itemId = data.rowId;
        this.deleteconfirmation.open();
        break;
    }
  }

  onSwitchToggle(value) {
    this.store.dispatch(new itemActions.SetNavigationFlag(value));

    if(this.navigationFlag) {
      this.router.navigate([{ outlets: { detail: null }}]);
    }
  }

  public onAddClicked() {
    if(this.navigationFlag)
      this.router.navigate([{ outlets: { primary: 'item' }, detail: null }]);
    else
      this.router.navigate([{ outlets: { detail: 'showItem' }}]);
  }

  public onDeleteConfirm(id: number) {
    this.store.dispatch(new itemActions.DeleteItem(this.itemId));

    // this.http.delete(Global.apiUrl + 'item/' + this.itemId)
    //   .subscribe((data: any) => {
    //     this.toastr.success('Record deleted successfully', 'Success!');
    //   },
    //   error => {
    //     this.toastr.error(error.message, 'Error!');
    //   },
    //   () => {
    //   });
  }

  public onChangeTable(config: any) {

  }

  public onPageChanged(data: any) {
    this.store.dispatch(new itemActions.SetPageNo(data.pageNo || 1));
  }
}
