import { Component, OnInit, OnChanges, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Global } from '../../../../../global';
import { ToastrService } from 'ngx-toastr';
import { Store, select } from '@ngrx/store';
import * as vendorActions from '../../store/vendor.actions';
import { ConfirmationComponent } from '../../../../shared/confirmation/confirmation.component';
import { VendorSelectors } from '../../store/vendor.selectors'
import { BaseListComponent } from '../../../base/base-list/base-list.component';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  moduleId: module.id,
  templateUrl: './vendor-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VendorListComponent extends BaseListComponent implements OnInit {
  rows$: Observable<Array<any>>;

  columns: Array<any> = [
    { key: 'E', tooltip: 'Edit Vendor', imageUrl: 'assets/edit.png', width: '40px' },
    { key: 'D', tooltip: 'Delete Vendor', imageUrl: 'assets/delete3.png', width: '40px' },
    { title: 'Vendor Id', name: 'vendorId', hidden: true },
    { title: 'Name', name: 'vendorName' },
    // filtering: {filterString: '', placeholder: 'Filter by descriiption'}, sort: 'asc'},
    { title: 'Address', name: 'address' },
    { title: 'Phone #', name: 'phoneNo' },
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
    super(route, router, toastr, store, VendorSelectors);
  }

  ngOnInit() {
    Global.stripFromUrl(4);

    this.rows$ = this.store.pipe(select(VendorSelectors.getVendors)).pipe(
      map((rows: any[]) => {
          const vendors = rows ? rows.map(vendor => ({...vendor, id: vendor.vendorId })) : [];
          return vendors;
      })
    );
  }

  ngOnDestroy() {
    super.destroy();
  }

  public onCellClick(data: any): any {
    if(!data.selectedId) {
      this.store.dispatch(new vendorActions.UnselectVendor());
      this.router.navigate([{ outlets: { detail: null }}]);
    }
    else {
      this.store.dispatch(new vendorActions.SelectVendor(data.selectedId));
      this.router.navigate([{ outlets: { detail: ['showVendor', data.selectedId] }}]);
    }
  }

  public onLinkClicked(data: any) {
    switch(data.name) {
      case 'E':
        if(this.navigationFlag)
          this.router.navigate([{ outlets: { primary: ['vendor', data.rowId] }, detail: null }]);
        else
          this.router.navigate([{ outlets: { detail: ['showVendor', data.rowId] }}]);
        break;

      case 'D':
        this.recordId = data.rowId;
        this.deleteconfirmation.open();
        break;
    }
  }

  onSwitchToggle(value) {
    this.store.dispatch(new vendorActions.SetNavigationFlag(value));

    if(this.navigationFlag) {
      this.router.navigate([{ outlets: { detail: null }}]);
    }
  }

  public onAddClicked() {
    if(this.navigationFlag)
      this.router.navigate([{ outlets: { primary: 'vendor' }, detail: null }]);
    else
      this.router.navigate([{ outlets: { detail: 'showVendor' }}]);
  }

  public onDeleteConfirm(id: number) {
    this.store.dispatch(new vendorActions.DeleteVendor(this.recordId));
  }

  public onChangeTable(config: any) {

  }

  public onPageChanged(data: any) {
    this.store.dispatch(new vendorActions.SetPageNo(data.pageNo));
  }

  public onRecordsPerPageChanged(data: number) {
    this.store.dispatch(new vendorActions.SetRecordsPerPage(data));
    this.store.dispatch(new vendorActions.SetPageNo(1));
  }
}
  