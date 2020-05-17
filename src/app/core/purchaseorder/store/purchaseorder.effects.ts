import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap, concatMap, tap } from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PurchaseOrderService } from '../../../services/common.services';
import * as purchaseOrderActions from './purchaseorder.actions';
import { PurchaseOrderActionTypes } from '.';
import { PurchaseOrder } from '../../../models/purchaseorder.model';
import * as recordActions from '../../../store/record.actions';

@Injectable()
export class PurchaseOrderEffects {

  constructor(private purchaseOrderService: PurchaseOrderService,
              private actions$: Actions) { }

  @Effect()
  loadPurchaseOrder$: Observable<Action> = this.actions$.pipe(
    ofType(PurchaseOrderActionTypes.LoadPurchaseOrder),
    mergeMap((action: purchaseOrderActions.LoadPurchaseOrder) =>
      this.purchaseOrderService.get(action.payload).pipe(
        map(purchaseOrder => (new purchaseOrderActions.LoadPurchaseOrderSuccess(purchaseOrder))),
        catchError(err => of(new recordActions.SetError(err)))
      )
    )
  );

  @Effect()
  loadPurchaseOrderList$: Observable<Action> = this.actions$.pipe(
    //catchError(err => of(new purchaseOrderActions.LoadPurchaseOrderListFail(err))),
    ofType(PurchaseOrderActionTypes.LoadPurchaseOrderList),
    mergeMap(action =>
      this.purchaseOrderService.getAllByStatusId(1).pipe(
        map(purchaseOrderList => (new purchaseOrderActions.LoadPurchaseOrderListSuccess(purchaseOrderList))),
        catchError(err => of(new recordActions.SetError(err)))
      )
    )
  );

  @Effect()
  savePurchaseOrder$: Observable<Action> = this.actions$.pipe(
    ofType(PurchaseOrderActionTypes.SavePurchaseOrder),
    map((action: purchaseOrderActions.SavePurchaseOrder) => action.payload),
    mergeMap((purchaseOrder: PurchaseOrder) =>
      this.purchaseOrderService.put(purchaseOrder.purchaseOrderId, purchaseOrder).pipe(
        switchMap((updatedPurchaseOrder: any) => [new purchaseOrderActions.SavePurchaseOrderSuccess(updatedPurchaseOrder),
                                         new recordActions.SaveRecordSuccess()]),
        catchError(err => of(new recordActions.SetError(err)))
      )
    )
  );

  @Effect()
  addPurchaseOrder$: Observable<Action> = this.actions$.pipe(
    ofType(PurchaseOrderActionTypes.AddPurchaseOrder),
    map((action: purchaseOrderActions.AddPurchaseOrder) => action.payload),
    mergeMap((purchaseOrder: PurchaseOrder) =>
      this.purchaseOrderService.post(purchaseOrder).pipe(
        switchMap((newPurchaseOrder:any) => [new purchaseOrderActions.AddPurchaseOrderSuccess(newPurchaseOrder),
                                    new recordActions.AddRecordSuccess()]),
        catchError(err => of(new recordActions.SetError(err)))
      )
    )
  );

  @Effect()
  deletePurchaseOrder$: Observable<Action> = this.actions$.pipe(
    ofType(PurchaseOrderActionTypes.DeletePurchaseOrder),
    map((action: purchaseOrderActions.DeletePurchaseOrder) => action.payload),
    concatMap((purchaseOrderId: number) =>
      this.purchaseOrderService.delete(purchaseOrderId).pipe(
        switchMap((purchaseOrder:any) => [new purchaseOrderActions.DeletePurchaseOrderSuccess(purchaseOrder),
                                 new recordActions.DeleteRecordSuccess()]),
        catchError(err => of(new recordActions.SetError(err)))
      )
    )
  );
  
  @Effect()
  postPurchaseOrder$: Observable<Action> = this.actions$.pipe(
    ofType(PurchaseOrderActionTypes.PostPurchaseOrder),
    map((action: purchaseOrderActions.PostPurchaseOrder) => action.payload),
    concatMap((purchaseOrderId: number) =>
      this.purchaseOrderService.put(purchaseOrderId, { statusId: 2 }).pipe(
        switchMap((purchaseOrder:any) => [new purchaseOrderActions.PostPurchaseOrderSuccess(purchaseOrder),
                                 new recordActions.PostRecordSuccess()]),
        catchError(err => of(new recordActions.SetError(err)))
      )
    )
  );
}
