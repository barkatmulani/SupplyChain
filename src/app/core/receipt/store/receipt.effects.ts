import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap, concatMap, tap } from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ReceiptService } from '../../../services/common.services';
import * as receiptActions from './receipt.actions';
import { ReceiptActionTypes } from '.';
import { Receipt } from '../../../models/receipt.model';
import * as recordActions from '../../../store/record.actions';

@Injectable()
export class ReceiptEffects {

  constructor(private receiptService: ReceiptService,
              private actions$: Actions) { }

  @Effect()
  loadReceipt$: Observable<Action> = this.actions$.pipe(
    ofType(ReceiptActionTypes.LoadReceipt),
    mergeMap((action: receiptActions.LoadReceipt) =>
      this.receiptService.get(action.payload).pipe(
        map(receipt => (new receiptActions.LoadReceiptSuccess(receipt))),
        catchError(err => of(new recordActions.SetError(err)))
      )
    )
  );
            
  @Effect()
  loadReceiptList$: Observable<Action> = this.actions$.pipe(
    //catchError(err => of(new receiptActions.LoadReceiptListFail(err))),
    ofType(ReceiptActionTypes.LoadReceiptList),
    mergeMap(action =>
      this.receiptService.getAllByStatusId(1).pipe(
        map(receiptList => (new receiptActions.LoadReceiptListSuccess(receiptList))),
        catchError(err => of(new recordActions.SetError(err)))
      )
    )
  );

  @Effect()
  saveReceipt$: Observable<Action> = this.actions$.pipe(
    ofType(ReceiptActionTypes.SaveReceipt),
    map((action: receiptActions.SaveReceipt) => action.payload),
    mergeMap((receipt: Receipt) =>
      this.receiptService.put(receipt.receiptId, receipt).pipe(
        switchMap((updatedReceipt: any) => [new receiptActions.SaveReceiptSuccess(updatedReceipt),
                                         new recordActions.SaveRecordSuccess()]),
        catchError(err => of(new recordActions.SetError(err)))
      )
    )
  );

  @Effect()
  addReceipt$: Observable<Action> = this.actions$.pipe(
    ofType(ReceiptActionTypes.AddReceipt),
    map((action: receiptActions.AddReceipt) => action.payload),
    mergeMap((receipt: Receipt) =>
      this.receiptService.post(receipt).pipe(
        switchMap((newReceipt:any) => [new receiptActions.AddReceiptSuccess(newReceipt),
                                    new recordActions.AddRecordSuccess()]),
        catchError(err => of(new recordActions.SetError(err)))
      )
    )
  );

  @Effect()
  deleteReceipt$: Observable<Action> = this.actions$.pipe(
    ofType(ReceiptActionTypes.DeleteReceipt),
    map((action: receiptActions.DeleteReceipt) => action.payload),
    concatMap((receiptId: number) =>
      this.receiptService.delete(receiptId).pipe(
        switchMap((receipt:any) => [new receiptActions.DeleteReceiptSuccess(receipt),
                                 new recordActions.DeleteRecordSuccess()]),
        catchError(err => of(new recordActions.SetError(err)))
      )
    )
  );

  @Effect()
  postReceipt$: Observable<Action> = this.actions$.pipe(
    ofType(ReceiptActionTypes.PostReceipt),
    map((action: receiptActions.PostReceipt) => action.payload),
    concatMap((ReceiptId: number) =>
      this.receiptService.put(ReceiptId, { statusId: 2 }).pipe(
        switchMap((Receipt:any) => [new receiptActions.PostReceiptSuccess(Receipt),
                                 new recordActions.PostRecordSuccess()]),
        catchError(err => of(new recordActions.SetError(err)))
      )
    )
  );
}
