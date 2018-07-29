import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'item',
  templateUrl: './item.component.html'
})
export class ItemComponent {
  
  private frmItem: FormGroup;

  constructor(private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private http: HttpClient)
  {
    let args: any[] = [];

    this.frmItem = new FormGroup ({
      itemDescription: new FormControl(),
      cost: new FormControl(),
      price: new FormControl()
    });
    
    route.params.forEach(x => {
      console.log(x);
      if(x.id && x.id > 0) {
        this.http.get('http://localhost:2020/SCMS/api/item/' + x.id).subscribe((data: any) => {
          this.loadData(data);
        },
        error => {
          console.log(error);
        });
      }
    });
  }

  loadData(data: any) {
    this.frmItem = this.fb.group({
      itemDescription: data.ItemDescription,
      cost: data.Cost,
      price: data.Price
    });
  }

  onSave() {
    this.toastr.success('Record saved successfully', 'Success!');
    this.router.navigate(['/itemlist']);
  }
}
