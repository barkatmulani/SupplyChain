import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap, map } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import { BaseDetailComponent } from '../../../base/base-detail/base-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Global } from '../../../../../global';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../store/item.actions';
import { ItemSelectors } from '../../store/item.selectors';

@Component({
  selector: 'item',
  moduleId: module.id,
  templateUrl: 'item-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent extends BaseDetailComponent implements OnInit {
  frmMain: FormGroup;
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
    super(router, toastr, store, modalService, ItemSelectors);
  }

  ngOnInit() {
    this.frmMain = this.fb.group({
      itemId: 0,
      active: true,
      itemDescription: ['', Validators.required],
      cost: '',
      price: ''
    });

    const id = this.route.snapshot.params.id;

    this.route.data.subscribe(x => console.log(x));

    if (id) {
      this.data$ = this.route.data.pipe(
        map(data => data.resolvedItem),
        tap(data => {
          if(data.item) {
            this.loadData(data.item);
          }
          else {
            super.handleError(data);
            this.frmMain.disable();
          }
        }));
    }
    else {
      this.data$ = of({});
    }

    this.onError$ = this.store.pipe(select(ItemSelectors.error)).subscribe(
        error => {
            if(error) this.toastr.error(error.message, 'Error!');
        }
    );

    Global.stripFromUrl(5);
  }

  loadData(data: any) {
    this.frmMain.patchValue({
      itemId: data.itemId,
      itemDescription: data.itemDescription,
      cost: data.cost,
      price: data.price
    });
    this.frmMain.markAsPristine();
  }

  onSave() {
    let item = {
      itemId: this.frmMain.get('itemId').value,
      active: true,
      itemDescription: this.frmMain.get('itemDescription').value,
      cost: this.frmMain.get('cost').value,
      price: this.frmMain.get('price').value
    };

    if(item.itemId === 0) {
        this.store.dispatch(new itemActions.AddItem(item));
    }
    else {
        this.store.dispatch(new itemActions.SaveItem(item));
    }
  }

  get isDirty(): boolean {
    return this.frmMain ? this.frmMain.dirty : false;
  }
}
