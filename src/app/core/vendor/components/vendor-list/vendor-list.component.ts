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
import { ConfirmationService } from '../../../../services/confirmation.service';


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

  constructor(router: Router,
              route: ActivatedRoute,
              toastr: ToastrService,
              store: Store,
              confirmationService: ConfirmationService) {
    super(route, router, toastr, store, confirmationService, VendorSelectors, vendorActions);
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

  public onCellClick(data: any): any {
    if(!data.selectedId) {
      this.store.dispatch(new vendorActions.UnselectVendor());
      this.router.navigate([{ outlets: { detail: null }}]);
    }
    else {
      this.store.dispatch(new vendorActions.SelectVendor(data.selectedId));
      this.router.navigate([{ outlets: { detail: ['vendor', 'show', data.selectedId] }}]);
    }
  }

  public onLinkClicked(data: any) {
    switch(data.name) {
      case 'E':
        if(this.navigationFlag)
          this.router.navigate([{ outlets: { primary: ['vendor', 'edit', data.rowId] }, detail: null }]);
        else
          this.router.navigate(['/vendor/view', { outlets: { detail: [data.rowId] }}]);
        break;

      case 'D':
        let modal1 = this.confirmationService.openDeleteModal();
        modal1.result.then(null, result => {
          if(result) this.onDeleteConfirm(data.rowId);
        });
        break;
    }
  }

  onDeleteConfirm(id: number) {
    this.store.dispatch(new this.childSelectors.DeleteItem(id));
  }

  onPageChanged(data: any) {
    this.store.dispatch(new vendorActions.SetPageNo(data.pageNo));
  }

  onRecordsPerPageChanged(data: number) {
    this.store.dispatch(new vendorActions.SetRecordsPerPage(data));
    this.store.dispatch(new vendorActions.SetPageNo(1));
  }

  public onSwitchToggle(value) {
    super.switchToggle(value);
  }

  public onAddClicked() {
    super.addClick('vendor');
  }
}
