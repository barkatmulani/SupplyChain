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
import * as vendorActions from '../../store/vendor.actions';
import { VendorSelectors } from '../../store/vendor.selectors';

@Component({
  selector: 'vendor',
  moduleId: module.id,
  templateUrl: 'vendor-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendorComponent extends BaseDetailComponent implements OnInit {
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
    super(router, toastr, store, modalService, VendorSelectors);
  }

  ngOnInit() {
    this.frmMain = this.fb.group ({
      vendorId: 0,
      vendorName: ['', [Validators.required]],
      address: '',
      phoneNo: ''
    });
    
    const id = this.route.snapshot.params.id;
    
    if (id) {
      this.data$ = this.route.data.pipe(
        map(data => (data.resolvedVendor.vendor)),
        tap(data => this.loadData(data)));
    }
    else {
      this.data$ = of({});
    }

    this.onError$ = this.store.pipe(select(VendorSelectors.error)).subscribe(
        error => {
            if(error) this.toastr.error(error.message, 'Error!');
        }
    );

    Global.stripFromUrl(5);
  }

  loadData(data: any) {
    this.frmMain.patchValue({
      vendorId: data.vendorId,
      vendorName: data.vendorName,
      address: data.address,
      phoneNo: data.phoneNo
    });
  }

  onSave() {
    let vendor = { vendorId: this.frmMain.get('vendorId').value,
                   active: true,
                   vendorName: this.frmMain.get('vendorName').value,
                   address: this.frmMain.get('address').value,
                   phoneNo: this.frmMain.get('phoneNo').value
                 };

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token',
        'Access-Control-Allow-Origin': '*'
      })};
    
      if(vendor.vendorId === 0) {
        this.store.dispatch(new vendorActions.AddVendor(vendor));
    }
    else {
        this.store.dispatch(new vendorActions.SaveVendor(vendor));
    }
  }

  onCancel() {
    this.router.navigate([{ outlets: { primary: 'vendors', detail: null }}]);
  }

  get isDirty(): boolean {
    return this.frmMain ? this.frmMain.dirty : false;
  }
}