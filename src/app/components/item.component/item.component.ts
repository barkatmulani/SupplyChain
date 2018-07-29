import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'item',
  templateUrl: './item.component.html'
})
export class ItemComponent {
  private url: Observable<string>;

  constructor(private toastr: ToastrService, private route: ActivatedRoute) {
    this.url = route.url.map(segments => segments.join(''));
  }

  onSave() {
    console.log(this.url);
    console.log('Ok');
    this.toastr.success('Record saved successfully', 'Success!');
  }
}
