import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap, concatMap } from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { VendorService } from '../../../services/common.services';
import * as vendorActions from './vendor.actions';
import { VendorActionTypes } from '.';
import * as recordActions from '../../../store/record/record.actions';
import { Vendor } from '../../../models/vendor.model';

@Injectable()
export class VendorEffects {

  constructor(private vendorService: VendorService,
              private actions$: Actions) { }

  loadVendorList$: Observable<Action> = createEffect(() => this.actions$.pipe(
    //catchError(err => of(new vendorActions.LoadVendorListFail(err))),
    ofType(VendorActionTypes.LoadVendorList),
    mergeMap(action =>
      this.vendorService.getAll().pipe(
        map(vendorList => (new vendorActions.LoadVendorListSuccess(vendorList))),
        catchError(err => of(new recordActions.SetError(err)))
      )
    )
  ));

  saveVendor$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(VendorActionTypes.SaveVendor),
    map((action: vendorActions.SaveVendor) => action.payload),
    mergeMap((vendor: Vendor) =>
      this.vendorService.put(vendor.vendorId, vendor).pipe(
        switchMap((updatedVendor: any) => [new vendorActions.SaveVendorSuccess(vendor),
                                         new recordActions.SaveRecordSuccess()]),
        catchError(err => of(new recordActions.SetError(err)))
      )
    )
  ));

  addVendor$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(VendorActionTypes.AddVendor),
    map((action: vendorActions.AddVendor) => action.payload),
    mergeMap((vendor: Vendor) =>
      this.vendorService.post(vendor).pipe(
        switchMap((newVendor:any) => [new vendorActions.AddVendorSuccess(newVendor),
                                    new recordActions.AddRecordSuccess()]),
        catchError(err => of(new recordActions.SetError(err)))
      )
    )
  ));

  deleteVendor$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(VendorActionTypes.DeleteVendor),
    map((action: vendorActions.DeleteVendor) => action.payload),
    concatMap((vendorId: number) =>
      this.vendorService.delete(vendorId).pipe(
        switchMap((vendor:any) => [new vendorActions.DeleteVendorSuccess(vendor),
                                 new recordActions.DeleteRecordSuccess()]),
        catchError(err => of(new recordActions.SetError(err)))
      )
    )
  ));
}
