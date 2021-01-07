import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TableComponent } from '../../../../shared/datatable/table.component';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { PurchaseOrderSelectors } from '../../store/purchaseOrder.selectors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseOrderComponent } from '../purchaseorder-detail/purchaseorder-detail.component';
import { LoadPurchaseOrder, DeletePurchaseOrder, PostPurchaseOrder } from '../../store/purchaseorder.actions';
import { ConfirmationService } from '../../../../services/confirmation.service';
import { BaseListComponent } from '../../../base/base-list/base-list.component';
import * as purchaseOrderActions from '../../store/purchaseorder.actions';

@Component({
  selector: 'purchaseorders',
  moduleId: module.id,
  templateUrl: 'purchaseorder-list.component.html'
})

export class PurchaseOrderListComponent extends BaseListComponent implements OnInit {
  rows$: Observable<Array<any>>; // = TableData;
  pageNo: number = 1;

  rows: any[];
  row: any = null;
  numPages = 1;
  recordsPerPage = 10;
  maxSize = 5;
  rowCount = 0;
  mode: string;
  poDialogVisible = false;

  purchaseOrderId: number;

  @ViewChild('datatable') datatable: TableComponent;

  columns: Array<any>;

  constructor(public route: ActivatedRoute,
              public router: Router,
              public toastr: ToastrService,
              public store: Store,
              public confirmationService: ConfirmationService,
              private modalService: NgbModal) {
    super(route, router, toastr, store, confirmationService, PurchaseOrderSelectors, purchaseOrderActions);
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      let count = data.resolvedPurchaseOrderList.count;
      console.log(count)

      this.mode = this.route.snapshot.params.mode;

      this.columns = [
        { key: 'E', tooltip: 'Edit Purchase Order', imageUrl: 'assets/edit.png', width: '40px', hidden: (this.mode === 'P') },
        { key: 'D', tooltip: 'Delete Purchase Order', imageUrl: 'assets/delete3.png', width: '40px', hidden: (this.mode === 'P') },
        { key: 'P', tooltip: 'Post Purchase Order', imageUrl: 'assets/post.png', width: '40px', hidden: (this.mode === 'L') },
        { key: 'V', tooltip: 'Post Purchase Order', imageUrl: 'assets/view.png', width: '40px', hidden: (this.mode === 'L') },
        { title: 'PO #', name: 'purchaseOrderId' },
        { title: 'PO Date', name: 'purchaseOrderDate', format: 'date' },
        { title: 'Est. Delivery', name: 'estDeliveryDate', format: 'date' },
        { title: 'Total', name: 'purchaseOrderTotal', format: 'currency' },
        { title: 'Shipment', name: 'shipmentCost', format: 'currency' },
      ];
    });

    //Global.stripFromUrl(4);

    this.rows$ = this.store.pipe(select(PurchaseOrderSelectors.getPurchaseOrders)).pipe(
      map(rows => rows ? rows.map(row => ({...row, id: row.purchaseOrderId})) : []),
    );
  }

  public onCellClick(data: any): any {
    console.log(data);
  }

  public onLinkClicked(data: any) {
    this.purchaseOrderId = data.rowId;

    switch(data.name) {
      case 'E':
        this.router.navigate(['purchaseorder', 'edit', this.purchaseOrderId]);
        break;
      case 'D':
        let modal1 = this.confirmationService.openDeleteModal();
        modal1.result.then(null, result => {
          if(result) this.onDeleteConfirm(data.rowId);
        });
        break;
      case 'P':
        let modal2 = this.confirmationService.openPostModal();
        modal2.result.then(null, result => {
          if(result) this.onPostConfirm(data.rowId);
        });
        break;
      case 'V':
        this.store.dispatch(new LoadPurchaseOrder(data.rowId));
        let comp = this.modalService.open(PurchaseOrderComponent);
        comp.componentInstance.isDisabled = true;
        break;
    }
  }

  public onAddClicked() {
    this.router.navigate([this.lastNavigationPath]);
  }

  public onDeleteConfirm(id: number) {
    this.store.dispatch(new DeletePurchaseOrder(id));
  }

  public onPostConfirm(id: number) {
    this.store.dispatch(new PostPurchaseOrder(id));
  }

  public onChangeTable(config: any) {

  }

  public onPageChanged(data: any) {
    //this.pageNo = data.pageNo;
    this.store.dispatch(new purchaseOrderActions.SetPageNo(data.pageNo));
  }

  public onClose() {
    this.poDialogVisible = false;
  }
}
