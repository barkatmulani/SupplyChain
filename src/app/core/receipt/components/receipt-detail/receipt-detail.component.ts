import { Component, ViewChild, OnInit, Input, OnChanges, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Global, Status } from '../../../../../global';
import { TableComponent } from '../../../../shared/datatable/table.component';
import { TextValuePair } from '../../../../models';
import { BaseDetailComponent } from '../../../base/base-detail/base-detail.component';
import { Store, select } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReceiptSelectors } from '../../store/receipt.selectors';
import { ConfirmationService } from '../../../../services/confirmation.service';
import { Item } from '../../../../models/item.model';
import { Subscription, Observable, EMPTY } from 'rxjs';
import { Inventory } from '../../../../models/inventory.model';
import { ItemSelectors } from '../../../item/store/item.selectors';
import { Vendor } from '../../../../models/Vendor.model';
import { InventorySelectors } from '../../../inventory/store/inventory.selectors';
import { VendorSelectors } from '../../../vendor/store/vendor.selectors';
import { SaveReceipt, AddReceipt } from '../../store/receipt.actions';
import { Receipt } from '../../../../models/receipt.model';
import { LoadPurchaseOrder } from '../../../purchaseorder/store/purchaseorder.actions';
import { PurchaseOrder } from '../../../../models/purchaseOrder.model';
import { PurchaseOrderSelectors } from '../../../purchaseorder/store/purchaseOrder.selectors';

@Component({
  selector: 'receipt',
  moduleId: module.id,
  templateUrl: 'receipt-detail.component.html'
})

export class ReceiptComponent extends BaseDetailComponent implements OnInit {
  @Input() isDisabled: boolean = false;

  @Output() close: EventEmitter<any> = new EventEmitter();

  @ViewChild('datatable') datatable: TableComponent;

  data$: Subscription;
  items$: Subscription;
  purchaseOrder$: Subscription;
  purchaseOrderItems$: Subscription;

  purchaseOrders$: Observable<PurchaseOrder[]>;
  inventories$: Observable<Inventory[]>;
  vendors$: Observable<Vendor[]>;

  receiptId: number;
  frmMain: FormGroup;

  receipt: any = {};

  items: Item[] = [];
  purchaseOrderItems: any[];
  receiptItems: any[] = [];
  columns: Array<any>;

  isTableDirty: boolean = false;

  constructor(public route: ActivatedRoute,
              public router: Router,
              public toastr: ToastrService,
              public store: Store,
              public modalService: NgbModal,
              private confirmationService: ConfirmationService,
              private fb: FormBuilder)
  {
    super(router, toastr, store, modalService, ReceiptSelectors);
  }

  ngOnInit() {
    this.frmMain = this.fb.group({
      active: true,
      purchaseOrderId: '',
      purchaseOrderTotal: { value: 0, disabled: true },
      vendorId: { value: 0, disabled: true },
      inventoryId: [{ value: 0, disabled: this.isDisabled }, Validators.required],
      purchaseOrderDate: { value: '', disabled: true },
      estDeliveryDate: { value: '', disabled: true },
      receiptDate: [{ value: Global.getCurrentDate(), disabled: this.isDisabled }, Validators.required],
      receiptTotal: { value: 0, disabled: this.isDisabled },
      extraCost: { value: 0, disabled: this.isDisabled }
    });

    this.loadDropdowns();

    this.columns = [
      { key: 'D', tooltip: 'Delete Item', imageUrl: 'assets/delete3.png', width: '40px' }, // 0
      { title: 'Receipt Item Id', name: 'receiptItemId', hidden: true }, // 1
      { title: 'Item', name: 'itemId', items: this.items, width: "200px" }, // 2
      { title: 'Cost', name: 'cost', width: "150px", format: 'currency' }, // 3
      { title: 'PO Qty.', name: 'poQuantity', type: 'number', format: 'number', width: "150px", disabled: true }, // 4
      { title: 'Rec. Qty.', name: 'quantity', type: 'number', format: 'number', width: "150px" }, // 5
      { title: 'Total', name: 'totalCost', width: "150px", format: 'currency', calcFormula: "[3] * [5]" }, // 6
    ];

    this.purchaseOrder$ = this.store.select(PurchaseOrderSelectors.getPurchaseOrder)
      .subscribe(purchaseOrder => this.loadPurchaseOrderInfo(purchaseOrder));

    this.data$ = this.store.pipe(select(ReceiptSelectors.getReceipt))
      .subscribe(data => {
        if(data) {
          this.loadData(data);
          //if(!this.isDisabled) this.frmMain.enable();
        }
        else {
          //this.frmMain.disable();
        }
    });

    this.items$ = this.store.pipe(select(ItemSelectors.getItems))
      .subscribe(items => {
        this.items = items
                    ? items.map(x => ({...x, ...(new TextValuePair(x.itemDescription, x.itemId.toString()))}))
                    : [];
        this.columns.find(x => x.name === 'itemId').items = this.items;
    });
  }

  ngOnDestroy() {
    if(this.data$) this.data$.unsubscribe();
    if(this.items$) this.items$.unsubscribe();
    if(this.purchaseOrderItems$) this.purchaseOrderItems$.unsubscribe();
    super.ngOnDestroy();
  }

  loadDropdowns() {
    this.purchaseOrders$ = this.store.pipe(select(PurchaseOrderSelectors.getPurchaseOrders));
    this.inventories$ = this.store.pipe(select(InventorySelectors.getInventories));
    this.vendors$ = this.store.pipe(select(VendorSelectors.getVendors));
  }

  loadData(data: any) {
    this.receipt = data;
    console.log(data);

    this.frmMain.patchValue({
        receiptId: data.receiptId,
        active: data.active,
        receiptDate: Global.getControlDate(data.receiptDate),
        receiptTotal: data.receiptTotal,
        purchaseOrderId: data.purchaseOrderId,
        inventoryId: data.inventoryId,
        vendorId: data.vendorId,
        estDeliveryDate: Global.getControlDate(data.estDeliveryDate),
        extraCost: data.extraCost,
        receiptItem: data.receiptItem
    });

    this.receiptId = data.receiptId;

    this.receiptItems = data.receiptItem
      ? data.receiptItem.map(x => ({...x}))
    : [];

    this.onPurchaseOrderChanged(data);
  }

  onSave() {
    let receiptItem: any[] = [];
    let receiptId: number = this.receiptId | 0;
    let receiptTotal: number = 0;

    this.receiptItems.forEach(x => {
      receiptItem.push( {
        receiptItemId: x.receiptItemId,
        receiptId: receiptId,
        itemId: x.itemId,
        quantity: x.quantity,
        cost: x.cost,
        totalCost: x.totalCost
      });

      receiptTotal += x.totalCost;
    });

    let receipt: Receipt = {
      receiptId: receiptId,
      receiptDate: this.frmMain.get('receiptDate').value,
      active: true,
      purchaseOrderId: this.frmMain.get('purchaseOrderId').value,
      receiptTotal: receiptTotal,
      inventoryId: this.frmMain.get('inventoryId').value,
      extraCost: this.frmMain.get('extraCost').value,
      statusId: Status.Open,
      vendorId: this.frmMain.get('vendorId').value,
      estDeliveryDate: this.frmMain.get('estDeliveryDate').value,
      receiptItem: receiptItem
    };

    if(receiptId === 0)
      this.store.dispatch(new AddReceipt(receipt));
    else
      this.store.dispatch(new SaveReceipt(receipt));
  }

  onAddClicked() {
    this.receiptItems = Global.addArrayItem(this.receiptItems,
      { pOItemId: 0, estDeliveryDate: '', shipmentCost: 0, itemId: '', itemList: this.items });
    this.isTableDirty = true;
  }

  onLinkClicked(data: any) {
    switch(data.name) {
      case 'D':
        let modal1 = this.confirmationService.openDeleteModal();
        modal1.result.then(null, result => {
          if(result) this.onDeleteConfirm(data.rowIndex);
        });
        break;
    }
  }

  onCellValueChanged(data: any) {
    this.isTableDirty = true;
    //if(data.columnName === 'itemId')
  }

  onDropdownChanged(data: any) {
    let row = this.receiptItems[data.rowNo];

    if(data.columnName === 'itemId') {
      this.fillItemDetails(data.id, row);
    }

    this.isTableDirty = true;
  }

  fillItemDetails(itemId: number, row: any) {
    if(itemId > 0) {
      let data = this.items.find(x => x.itemId == itemId);
      row.itemId = itemId;
      row.cost = data.cost;
    }
    else {
      row.cost = '';
    }

    const poItem = itemId > 0 ? this.purchaseOrderItems.find(x => x.itemId == itemId) : null;
    row.poQuantity = poItem ? poItem.quantity : '';
  }

  onDeleteConfirm(index: number) {
    this.receiptItems = Global.removeArrayItem(this.receiptItems, index);
    this.toastr.success('Record deleted successfully', 'Success!');
    this.isTableDirty = true;
  }

  onPurchaseOrderChanged(data: any) {
    this.store.dispatch(new LoadPurchaseOrder(+data.purchaseOrderId));
  }

  loadPurchaseOrderInfo(rec: any) {
    if(rec) {
      this.frmMain.patchValue({
        purchaseOrderTotal: rec.purchaseOrderTotal,
        vendorId: rec.vendorId,
        inventoryId: rec.inventoryId,
        purchaseOrderDate: rec.purchaseOrderDate ? rec.purchaseOrderDate.substr(0, 10) : '',
        estDeliveryDate: rec.estDeliveryDate ? rec.estDeliveryDate.substr(0, 10) : ''
      });

      this.purchaseOrderItems = rec.purchaseOrderItem;

      if(!this.receiptId) {
        this.receiptItems = rec.purchaseOrderItem.map(item => ({
          ...item,
          poQuantity: item.quantity
        }));
      }
      else {
        this.receiptItems = this.receiptItems.map(receiptItem => {
          const item = rec.purchaseOrderItem.find(poItem => poItem.itemId == receiptItem.itemId);
          return {...receiptItem, poQuantity: item ? item.quantity : '' };
        });
      }
    }
  }
}
