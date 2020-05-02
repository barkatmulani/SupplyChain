import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TableComponent } from '../../../shared/datatable/table.component';
import { Global } from '../../../../global';
import { ConfirmationComponent } from '../../../shared/confirmation/confirmation.component';
import { ToastrService } from 'ngx-toastr';
import { VendorService } from '../../../services/common.services';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as vendorListSelectors from './store/vendor-list.selectors';
import { map } from 'rxjs/operators';
import { SetPageNo } from './store/vendor-list.actions';

@Component({
  selector: 'vendorlist',
  moduleId: module.id,
  templateUrl: 'vendor-list.component.html'
})

export class VendorListComponent implements OnInit, OnChanges {
  rows$: Observable<Array<any>>;
  pageNo$: Observable<number>;

  vendorsPerPage = 10;
  maxSize = 5;
  numPages = 1;
  rowCount = 0;

  vendorId: number;

  columns: Array<any> = [
    { key: 'E', tooltip: 'Edit Vendor', imageUrl: 'assets/edit.png', width: '40px' },
    { key: 'D', tooltip: 'Delete Vendor', imageUrl: 'assets/delete3.png', width: '40px' },
    { title: 'Vendor Id', name: 'vendorId', hidden: true },
    { title: 'Name', name: 'vendorName' },
    // filtering: {filterString: '', placeholder: 'Filter by descriiption'}, sort: 'asc'},
    { title: 'Address', name: 'address' },
    { title: 'Phone #', name: 'phoneNo' },
  ];

  @ViewChild('datatable') datatable: TableComponent;
  @ViewChild('deleteconfirmation') deleteconfirmation: ConfirmationComponent;

  constructor(private router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private vendorService: VendorService,
              private store: Store) { }

  ngOnInit(): void {
    
    Global.stripFromUrl(4);

    this.router.navigate([{ outlets: { detail: null }}]);

    this.pageNo$ = this.store.pipe(select(vendorListSelectors.getPageNo));
    
    this.rows$ = this.route.data.pipe(
      map((data) => (data.resolvedVendorList.vendors)),
    );
  }

  ngOnChanges(): void {
  }

  public onCellClick(data: any): any {
    console.log(data);
  }

  public onLinkClicked(data: any) {
    switch(data.name) {
      case 'E':
        this.router.navigate(['/vendor', data.rowId]);
        break;
      case 'D':
        this.vendorId = data.rowId;
        this.deleteconfirmation.open();
        break;
    }
  }

  public onAddClicked() {
    this.router.navigate(['/vendor/0']);
  }

  public onDeleteConfirm(id: string) {
    this.vendorService.delete(this.vendorId)
      .subscribe((data: any) => {
        this.toastr.success('Record deleted successfully', 'Success!');
      },
      error => {
        this.toastr.error(error.message, 'Error!');
      },
      () => {
      });
  }

  public onChangeTable(config: any) {

  }

  public onPageChanged(data: any) {
    this.store.dispatch(new SetPageNo(data.pageNo || 1));
  }
}
