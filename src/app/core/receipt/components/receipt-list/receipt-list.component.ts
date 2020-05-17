import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TableComponent } from '../../../../shared/datatable/table.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from '../../../../services/confirmation.service';
import { BaseListComponent } from '../../../base/base-list/base-list.component';
import { Store, select } from '@ngrx/store';
import { ReceiptSelectors } from '../../store/receipt.selectors';
import { DeleteReceipt, PostReceipt, LoadReceipt } from '../../store/receipt.actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReceiptComponent } from '../receipt-detail/receipt-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'receipt-list',
  moduleId: module.id,
  templateUrl: 'receipt-list.component.html'
})

export class ReceiptListComponent extends BaseListComponent implements OnInit {
  rows$: Observable<Array<any>>; // = TableData;
  pageNo: number = 1;

  rows: any[];
  numPages = 1;
  recordsPerPage = 10;
  maxSize = 5;
  rowCount = 0;
  mode = 'P';

  receiptId: number;

  @ViewChild('datatable') datatable: TableComponent;
  columns: Array<any>;

  constructor(public route: ActivatedRoute,
              public router: Router,
              public toastr: ToastrService,
              public store: Store,
              private modalService: NgbModal,
              private confirmationService: ConfirmationService) {
      super(route, router, toastr, store, ReceiptSelectors);
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      let count = data.resolvedReceiptList.count;
      console.log(count)
        
      this.mode = this.route.snapshot.params.mode;

      this.columns = [
        { key: 'E', tooltip: 'Edit Inventory Receipt', imageUrl: 'assets/edit.png', width: '40px', hidden: (this.mode === 'P') },
        { key: 'D', tooltip: 'Delete Inventory Receipt', imageUrl: 'assets/delete3.png', width: '40px', hidden: (this.mode === 'P') },
        { key: 'P', tooltip: 'Post Inventory Receipt', imageUrl: 'assets/post.png', width: '40px', hidden: (this.mode === 'L') },
        { key: 'V', tooltip: 'View Inventory Receipt', imageUrl: 'assets/view.png', width: '40px', hidden: (this.mode === 'L') },
        { title: 'Rec. #', name: 'receiptId' },
        { title: 'Rec. Date', name: 'receiptDate', format: 'date' },
        { title: 'Total', name: 'receiptTotal', format: 'currency' },
        { title: 'Extra Cost', name: 'extraCost', format: 'currency' },
      ];
    });

    this.rows$ = this.store.pipe(select(ReceiptSelectors.getReceipts)).pipe(
      map(rows => rows ? rows.map(row => ({...row, id: row.receiptId})) : []),
    );
  }

  public onCellClick(data: any): any {
    console.log(data);
  }

  public onLinkClicked(data: any) {
    this.receiptId = data.rowId;

    switch(data.name) {
      case 'E':
        this.router.navigate(['receipt', this.receiptId]);
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
        this.store.dispatch(new LoadReceipt(data.rowId));
        let comp = this.modalService.open(ReceiptComponent);
        comp.componentInstance.isDisabled = true;
        break;
    }
  }

  public onAddClicked() {
    this.router.navigate(['receipt']);
  }

  public onDeleteConfirm(id: number) {
    this.store.dispatch(new DeleteReceipt(id));
  }

  public onPostConfirm(id: number) {
    this.store.dispatch(new PostReceipt(id));
  }

  public onChangeTable(config: any) {

  }

  public onPageChanged(data: any) {
    this.pageNo = data.pageNo;
  }

  public onClose() {
  }
}
