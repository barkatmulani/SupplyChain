import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TableComponent } from '../../../../shared/datatable/table.component';
import { Global } from '../../../../../global';
import { ToastrService } from 'ngx-toastr';
import { PurchaseOrderService } from '../../../../services/common.services';
import { ConfirmationComponent } from '../../../../shared/confirmation/confirmation.component';
import { Observable, of } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { PurchaseOrderSelectors } from '../../store/purchaseOrder.selectors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseOrderComponent } from '../purchaseorder-detail/purchaseorder-detail.component';
import { LoadPurchaseOrder } from '../../store/purchaseorder.actions';

@Component({
  selector: 'purchaseorders',
  moduleId: module.id,
  templateUrl: 'purchaseorder-list.component.html'
})

export class PurchaseOrderListComponent implements OnInit {
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
  @ViewChild('deleteconfirmation') deleteconfirmation: ConfirmationComponent;
  @ViewChild('postconfirmation') postconfirmation: ConfirmationComponent;

  columns: Array<any>;

  constructor(private router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private store: Store,
              private modalService: NgbModal,
              private purchaseOrderService: PurchaseOrderService) {
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
      tap(rows => {
        this.rowCount = rows.length
        this.rows = rows;
      })
    );
  }


  public onCellClick(data: any): any {
    console.log(data);
  }

  public onLinkClicked(data: any) {
    this.purchaseOrderId = data.rowId;

    switch(data.name) {
      case 'E':
        this.router.navigate(['purchaseorder', this.purchaseOrderId]);
        break;
      case 'D':
        this.deleteconfirmation.open();
        break;
      case 'P':
        this.postconfirmation.open();
        break;
      case 'V':
        this.store.dispatch(new LoadPurchaseOrder(data.rowId));
        
        let comp = this.modalService.open(PurchaseOrderComponent);
        comp.componentInstance.purchaseOrderId = data.rowId;
        comp.componentInstance.isDisabled = true;
        
        break;
    }
  }

  public onAddClicked() {
    this.router.navigate(['purchaseorder']);
  }

  public onDeleteConfirm(id: string) {
    this.purchaseOrderService.delete(this.purchaseOrderId)
      .subscribe((data: any) => {
        this.toastr.success('Record deleted successfully', 'Success!');
        // this.loadData();
      },
      error => {
        this.toastr.error(error.message, 'Error!');
      },
      () => {
      });
  }

  public onPostConfirm(id: string) {
    this.purchaseOrderService.put(this.purchaseOrderId, { statusId: 2 })
      .subscribe((data: any) => {
        this.toastr.success('Record posted successfully', 'Success!');
        // this.loadData();
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
    this.pageNo = data.pageNo;
  }

  public onClose() {
    this.poDialogVisible = false;
  }
}
