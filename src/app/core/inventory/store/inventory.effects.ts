import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap, concatMap } from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { InventoryService } from '../../../services/common.services';
import * as inventoryActions from './inventory.actions';
import { InventoryActionTypes } from '.';
import { Inventory } from '../../../models/inventory.model';
import * as recordActions from '../../../store/record.actions';

@Injectable()
export class InventoryEffects {

  constructor(private inventoryService: InventoryService,
              private actions$: Actions) { }

  @Effect()
  loadInventoryList$: Observable<Action> = this.actions$.pipe(
    //catchError(err => of(new inventoryActions.LoadInventoryListFail(err))),
    ofType(InventoryActionTypes.LoadInventoryList),
    mergeMap(action =>
      this.inventoryService.getAll().pipe(
        map(InventoryList => (new inventoryActions.LoadInventoryListSuccess(InventoryList))),
        catchError(err => of(new recordActions.SetError(err)))
      )
    )
  );

  @Effect()
  saveInventory$: Observable<Action> = this.actions$.pipe(
    ofType(InventoryActionTypes.SaveInventory),
    map((action: inventoryActions.SaveInventory) => action.payload),
    mergeMap((inventory: Inventory) =>
      this.inventoryService.put(inventory.inventoryId, inventory).pipe(
        switchMap((updatedInventory: any) => [new inventoryActions.SaveInventorySuccess(inventory),
                                         new recordActions.SaveRecordSuccess()]),
        catchError(err => of(new recordActions.SetError(err)))
      )
    )
  );

  @Effect()
  addInventory$: Observable<Action> = this.actions$.pipe(
    ofType(InventoryActionTypes.AddInventory),
    map((action: inventoryActions.AddInventory) => action.payload),
    mergeMap((inventory: Inventory) =>
      this.inventoryService.post(inventory).pipe(
        switchMap((newInventory:any) => [new inventoryActions.AddInventorySuccess(newInventory),
                                    new recordActions.AddRecordSuccess()]),
        catchError(err => of(new recordActions.SetError(err)))
      )
    )
  );

  @Effect()
  deleteInventory$: Observable<Action> = this.actions$.pipe(
    ofType(InventoryActionTypes.DeleteInventory),
    map((action: inventoryActions.DeleteInventory) => action.payload),
    concatMap((inventoryId: number) =>
      this.inventoryService.delete(inventoryId).pipe(
        switchMap((inventory:any) => [new inventoryActions.DeleteInventorySuccess(inventory),
                                 new recordActions.DeleteRecordSuccess()]),
        catchError(err => of(new recordActions.SetError(err)))
      )
    )
  );
}
