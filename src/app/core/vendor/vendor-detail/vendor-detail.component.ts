import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Global } from '../../../../global';
import { VendorService } from '../../../services/common.services';
import { Observable } from 'rxjs';
import { Vendor } from '../../../models/Vendor.model';
import { map, tap } from 'rxjs/operators';

@Component({
  moduleId: module.id,
  templateUrl: 'vendor-detail.component.html'
})
export class VendorComponent implements OnInit {
  
  public frmVendor: FormGroup;

  data$: Observable<Vendor>;

  pageNo: number = 1;

  constructor(private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private http: HttpClient,
              private vendorService: VendorService)
  { }

  ngOnInit() {
    this.frmVendor = this.fb.group ({
      vendorId: 0,
      vendorName: ['', [Validators.required]],
      address: '',
      phoneNo: ''
    });
    
    this.data$ = this.route.data.pipe(
      tap(item => console.log(item)),
      map(data => (data.resolvedVendor.vendor)),
      tap(data => this.loadData(data)));

    
    let pageNo = this.route.snapshot.params['pageNo'];
    if(pageNo && pageNo > 0) this.pageNo = pageNo;

    Global.stripFromUrl(5);
  }

  loadData(data: any) {
    this.frmVendor.patchValue({
      vendorId: data.vendorId,
      vendorName: data.vendorName,
      address: data.address,
      phoneNo: data.phoneNo
    });
  }

  onSave() {
    let vendor = { vendorId: this.frmVendor.get('vendorId').value,
                   active: true,
                   vendorName: this.frmVendor.get('vendorName').value,
                   address: this.frmVendor.get('address').value,
                   phoneNo: this.frmVendor.get('phoneNo').value
                 };

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token',
        'Access-Control-Allow-Origin': '*'
      })};
    
    console.log(vendor);
    let methodCall: any;

    if(vendor.vendorId === 0) {
        methodCall = this.http.post(Global.apiUrl + 'vendor', vendor);
    }
    else {
        methodCall = this.http.put(Global.apiUrl + 'vendor/' + vendor.vendorId, vendor);
    }
        
    methodCall.subscribe((data: any) => {
        this.toastr.success('Record saved successfully', 'Success!');
        this.router.navigate(['/vendor-list', this.pageNo]);
      },
      error => {
        console.log(error);
        this.toastr.error(error.message, 'Error!');
      },
      () => {
      });
  }

  onCancel() {
    this.router.navigate(['/vendor-list', this.pageNo]);
  }  
}
