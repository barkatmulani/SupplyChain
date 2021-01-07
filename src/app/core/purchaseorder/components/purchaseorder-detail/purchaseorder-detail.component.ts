import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Status, Global } from '../../../../../global';
import { TableComponent } from '../../../../shared/datatable/table.component';
import { Store, select } from '@ngrx/store';
import { InventorySelectors } from '../../../inventory/store/inventory.selectors';
import { Observable, Subscription } from 'rxjs';
import { ItemSelectors } from '../../../item/store/item.selectors';
import { Vendor } from '../../../../models/Vendor.model';
import { Inventory } from '../../../../models/inventory.model';
import { Item } from '../../../../models/item.model';
import { VendorSelectors } from '../../../vendor/store/vendor.selectors';
import { BaseDetailComponent } from '../../../base/base-detail/base-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseOrderSelectors } from '../../store/purchaseOrder.selectors';
import { TextValuePair } from '../../../../models';
import { SavePurchaseOrder, AddPurchaseOrder } from '../../store/purchaseorder.actions';
import { ConfirmationService } from '../../../../services/confirmation.service';


@Component({
  selector: 'purchaseorder',
  moduleId: module.id,
  templateUrl: 'purchaseorder-detail.component.html',
  styleUrls: ['purchaseorder-detail.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})

export class PurchaseOrderComponent extends BaseDetailComponent implements OnInit, OnDestroy {
  @Input() isDisabled: boolean = false;

  @Output() close: EventEmitter<any> = new EventEmitter();

  //@ViewChild('datatable') datatable: TableComponent;

  data$: Subscription;
  items$: Subscription;
  inventories$: Observable<Inventory[]>;
  vendors$: Observable<Vendor[]>;

  frmMain: FormGroup;

  purchaseOrderId: number;
  index: number;
  isTableDirty: boolean = false;
  mode: string;

  purchaseOrder: any = {};
  purchaseOrderText: string;

  items: Item[] = [];
  pOItems: any[] = [];
  columns: Array<any>;

  constructor(public toastr: ToastrService,
              public router: Router,
              public store: Store,
              public modalService: NgbModal,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private confirmationService: ConfirmationService)
    {
      super(router, toastr, store, modalService, PurchaseOrderSelectors);
    }

  ngOnInit() {
    this.frmMain = this.fb.group({
      purchaseOrderId: [{ value: 0, disabled: true }],
      active: true,
      purchaseOrderDate: [{ value: '', disabled: this.isDisabled }, Validators.required],
      purchaseOrderTotal: 0,
      inventoryId: [{ value: 0, disabled: this.isDisabled }, Validators.required],
      vendorId: [{ value: 0, disabled: this.isDisabled }, Validators.required],
      estDeliveryDate: [{ value: '', disabled: this.isDisabled }],
      shipmentCost:  [{ value: 0, disabled: this.isDisabled}]
    });

    // this.route.data.subscribe(
    //   data => {
    //     console.log(data);
    //     if(data.resolvedPurchaseOrder && data.resolvedPurchaseOrder.error) {
    //       //super.handleError(data);
    //       this.frmMain.disable();
    //     }
    //   });

    this.loadDropdowns();

    //this.store.dispatch(new LoadPurchaseOrder(this.purchaseOrderId || this.route.snapshot.params.id));

    this.columns = [
      { key: 'D', tooltip: 'Delete Item', imageUrl: 'assets/delete3.png', width: '40px' }, // 0
      { title: 'PO Item Id', name: 'purchaseOrderItemId', hidden: true }, // 1
      { title: 'Item', name: 'itemId', items: this.items, width: "200px" }, // 2
      { title: 'Avg. Cost', name: 'cost', width: "150px", format: 'currency' }, // 3
      { title: 'Qty.', name: 'quantity', type: 'number', format: 'number', width: "150px" }, // 4
      { title: 'Total', name: 'totalCost', width: "150px", format: 'currency', calcFormula: "[3] * [4]" }, // 5
    ];

    this.data$ = this.store.pipe(select(PurchaseOrderSelectors.getPurchaseOrder))
      .subscribe(data => {
        if(data) {
          this.loadData(data);
          if(!this.isDisabled) this.frmMain.enable();
        }
        else {
          this.frmMain.disable();
        }
      });

    this.items$ = this.store.pipe(select(ItemSelectors.getItems))
      .subscribe(items => {
        this.items = items
                    ? items.map(x => ({...x, ...(new TextValuePair(x.itemDescription, x.itemId.toString()))}))
                    : [];
        this.columns.find(x => x.name === 'itemId').items = this.items;
    });

        // console.log(items ? items.length : 0, data);
        // this.cd.markForCheck();
        // this.cd.reattach();

    // this.data$.pipe(
    //   switchMap((data) => this.items$,
    //     (data, items) => {
    //       this.items = items ? items.map(x => ({...x, ...(new TextValuePair(x.itemDescription, x.itemId.toString()))})) : [];
    //       return data;
    //     })).subscribe((data) => {
    //       this.cd.reattach();

    //       console.log(data);
    //       if(data) this.loadData(data);
    //       this.purchaseOrder = data;
    //       this.columns.find(x => x.name === 'itemId').items = this.items;
    //       this.pOItems = this.purchaseOrder && this.purchaseOrder.purchaseOrderItem
    //                     ? this.purchaseOrder.purchaseOrderItem.map(x => ({...x}))
    //                     : [];

    //     })

  }

  loadData(data: any) {
    this.purchaseOrder = {...data};

    this.frmMain.patchValue({
        purchaseOrderId: data.purchaseOrderId,
        active: data.active,
        purchaseOrderDate: data.purchaseOrderDate.substr(0, 10),
        purchaseOrderTotal: data.purchaseOrderTotal,
        inventoryId: data.inventoryId,
        vendorId: data.vendorId,
        estDeliveryDate: data.estDeliveryDate.substr(0, 10),
        shipmentCost: data.shipmentCost,
        purchaseOrderItem: data.purchaseOrderItem
    });

    const id = this.route.snapshot.params.id;

    if(id) {
      this.purchaseOrderText = id && id > 0 ? id : "New Record";
      this.purchaseOrderId = id;
      this.isDisabled = false;
    }
    else {
      this.purchaseOrderText = data.purchaseOrderId;
      this.purchaseOrderId = data.purchaseOrderId;
      this.isDisabled = true;
    }

    this.pOItems = data.purchaseOrderItem
                  ? data.purchaseOrderItem.map(x => ({...x}))
                  : [];

    //this.datatable.renderRows();
  }

  ngOnDestroy() {
    //if (this.items$) this.items$.unsubscribe();
    super.ngOnDestroy();
  }

  loadDropdowns() {
    this.inventories$ = this.store.pipe(select(InventorySelectors.getInventories));
    this.vendors$ = this.store.pipe(select(VendorSelectors.getVendors));
  }

  onSave() {
    let purchaseOrderId: number = this.purchaseOrderId | 0;
    let purchaseOrderTotal: number = 0;

    purchaseOrderTotal = this.pOItems ? this.pOItems.reduce((prev: any, curr: any) => {
      return {totalCost: prev.totalCost + curr.totalCost};
    }).totalCost : 0;

    let purchaseOrder = {
      purchaseOrderId: purchaseOrderId,
      active: this.frmMain.get('active').value,
      statusId: Status.Open,
      purchaseOrderDate: this.frmMain.get('purchaseOrderDate').value,
      purchaseOrderTotal: purchaseOrderTotal,
      inventoryId: this.frmMain.get('inventoryId').value,
      vendorId: this.frmMain.get('vendorId').value,
      estDeliveryDate: this.frmMain.get('estDeliveryDate').value,
      shipmentCost: this.frmMain.get('shipmentCost').value,
      purchaseOrderItem: this.pOItems
    };

    if(purchaseOrderId === 0)
      this.store.dispatch(new AddPurchaseOrder(purchaseOrder));
    else
      this.store.dispatch(new SavePurchaseOrder(purchaseOrder));
  }

  onClose() {
    this.close.emit();
  }

  onAddClicked() {
    this.pOItems = [...this.pOItems,
      { purchaseOrderItemId: 0,
        purchaseOrderId: this.purchaseOrderId,
        itemId: -1,
        cost: 0,
        quantity: 1,
        rowNo: 0 + this.pOItems.length - 1,
        totalCost: 0
      }];

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
    //if(data.columnName === 'itemId')
  }

  onDropdownChanged(data: any) {
    let row = this.pOItems[data.rowNo];
    if(data.columnName === 'itemId') {
        this.fillItemDetails(parseInt(data.id), row);
    }
  }

  fillItemDetails(id: number, row: any) {
    if(id > 0) {
      let data = this.items.find(x => x.itemId == id);
      row.itemId = id;
      row.cost = data.cost;
      this.isTableDirty = true;
    }
    else {
      row.cost = 0;
    }
    //this.datatable.renderRows();
  }

  onDeleteConfirm(index) {
    this.pOItems = Global.removeArrayItem(this.pOItems, index);
    this.toastr.success('Record deleted successfully', 'Success!');
    this.isTableDirty = true;
  }

  get isDirty() {
    return this.frmMain.dirty;
  }
}
