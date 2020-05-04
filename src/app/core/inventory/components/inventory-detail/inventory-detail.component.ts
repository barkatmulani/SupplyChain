import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap, map } from 'rxjs/operators';
import { Observable, of, Subscription, combineLatest } from 'rxjs';
import { BaseDetailComponent } from '../../../base/base-detail/base-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Global } from '../../../../../global';
import { Store, select } from '@ngrx/store';
import * as inventoryActions from '../../store/inventory.actions';
import { inventorySelectors } from '../../store/inventory.selectors';
import { ItemSelectors } from '../../../item/store/item.selectors';

@Component({
  selector: 'inventory',
  moduleId: module.id,
  templateUrl: 'inventory-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryComponent extends BaseDetailComponent implements OnInit {
  frmMain: FormGroup;
  data$: Observable<any>;
  items$: Observable<any[]>;
  onError$: Subscription;
  columns: any[];

  constructor(public toastr: ToastrService,
              public router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              public modalService: NgbModal,
              public store: Store)
  {
    super(router, toastr, store, modalService, inventorySelectors);
  }

  ngOnInit() {
    this.frmMain = this.fb.group({
      inventoryId: 0,
      inventoryDescription: ['', Validators.required],
      address: '',
    });
    
    this.columns = [
      { title: 'Inventory Item Id', name: 'inventoryItemId', hidden: true }, // 0
      //{ title: 'Item', name: 'itemId', itemsProp: 'itemList', width: "200px", disabled: false }, // 1
      { title: 'Item', name: 'itemName', width: "200px", disabled: false }, // 1
      { title: 'Qty.', name: 'totalQuantity', format: 'number', width: "150px" }, // 2
      { title: 'Avg. Cost', name: 'avgCost', width: "150px", format: 'currency' }, // 3
      { title: 'Total', name: 'totalCost', width: "150px", format: 'currency' }, // 4
    ];

    const id = this.route.snapshot.params.id;
    
    if (id) {
      this.data$ = this.route.data.pipe(
        map(data => (data.resolvedInventory.inventory)),
        tap(data => this.loadData(data)));
    }
    else {
      this.data$ = of({});
    }

    this.onError$ = this.store.pipe(select(inventorySelectors.error)).subscribe(
      error => {
          if(error) this.toastr.error(error.message, 'Error!');
      }
    );

    Global.stripFromUrl(5);
  }

  loadData(data: any) {
    this.frmMain.patchValue({
      inventoryId: data.inventoryId,
      inventoryDescription: data.inventoryDescription,
      address: data.address
    });

    this.frmMain.markAsPristine();

    let item: any;

    this.items$ = combineLatest([
      of(data.inventoryItem as any[]),
      this.store.pipe(select(ItemSelectors.getItems))])
        .pipe(
          map(([inventoryItems, items]) => {
              return inventoryItems.map(inventoryItem => {
                item = items ? items.find(x => inventoryItem.itemId === x.itemId) : [];
                return {...inventoryItem, itemName: item ? item.itemDescription: ''};
              })
          })
        );
  }

  onSave() {
    let inventory = {
      inventoryId: this.frmMain.get('inventoryId').value,
      active: true,
      inventoryDescription: this.frmMain.get('inventoryDescription').value,
      address: this.frmMain.get('address').value
    };
    
    if(inventory.inventoryId === 0) {
      this.store.dispatch(new inventoryActions.AddInventory(inventory));
    }
    else {
      this.store.dispatch(new inventoryActions.SaveInventory(inventory));
    }
  }

  onCancel() {
    this.router.navigate([{ outlets: { primary: 'inventories', detail: null }}]);
  }

  get isDirty(): boolean {
    return this.frmMain ? this.frmMain.dirty : false;
  }
}
