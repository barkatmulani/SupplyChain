import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap, map } from 'rxjs/operators';
import { Observable, of, EMPTY, Subscription } from 'rxjs';
import { BaseDetailComponent } from '../../../base/base-detail/base-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Global } from '../../../../../global';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../store/item.actions';
import { itemSelectors } from '../../store/item.selectors';

@Component({
  selector: 'item',
  moduleId: module.id,
  templateUrl: 'item-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent extends BaseDetailComponent implements OnInit, OnDestroy {
  frmItem: FormGroup;
  data$: Observable<any>;
  recordUpdated$: Subscription;
  onError$: Subscription;

  constructor(public toastr: ToastrService,
              public router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              public modalService: NgbModal,
              public store: Store)
  {
    super(modalService, store, toastr, router);
  }

  ngOnInit() {
    this.frmItem = this.fb.group({
      itemId: 0,
      active: true,
      itemDescription: ['', Validators.required],
      cost: '',
      price: ''
    });
    
    const id = this.route.snapshot.params.id;
    
    if (id) {
      this.data$ = this.route.data.pipe(
        map(data => (data.resolvedItem.item)),
        tap(data => this.loadData(data)));
    }
    else {
      this.data$ = of({});
    }

    // this.recordUpdated$ = this.store.pipe(select(itemSelectors.updatedItem)).subscribe(
    //   item => {
    //     if (item) {
    //       this.store.dispatch(new ResetUpdatedItem());
    //       this.frmItem.markAsPristine();
    //       this.toastr.success(`Item ${item.itemId === 0 ? 'added' : 'saved'} successfully`, 'Success!');
    //       this.router.navigate([{ outlets: { primary: 'items', detail: null } }]);
    //     }}
    // );

    this.onError$ = this.store.pipe(select(itemSelectors.error)).subscribe(
        error => {
            if(error) this.toastr.error(error.message, 'Error!');
        }
    );

    Global.stripFromUrl(5);
  }

  ngOnDestroy() {
    super.destroy();
  }

  loadData(data: any) {
    this.frmItem.patchValue({
      itemId: data.itemId,
      itemDescription: data.itemDescription,
      cost: data.cost,
      price: data.price
    });
    this.frmItem.markAsPristine();
  }

  onSave() {
    let item = {
      itemId: this.frmItem.get('itemId').value,
      active: true,
      itemDescription: this.frmItem.get('itemDescription').value,
      cost: this.frmItem.get('cost').value,
      price: this.frmItem.get('price').value
    };

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token',
        'Access-Control-Allow-Origin': '*'
      })};
    
    if(item.itemId === 0) {
        this.store.dispatch(new itemActions.AddItem(item));
    }
    else {
        this.store.dispatch(new itemActions.SaveItem(item));
    }
  }

  onCancel() {
    this.router.navigate([{ outlets: { primary: 'items', detail: null }}]);
  }

  get isDirty(): boolean {
    return this.frmItem ? this.frmItem.dirty : false;
  }
}