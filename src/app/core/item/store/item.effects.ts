import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap, concatMap } from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ItemService } from '../../../services/common.services';
import * as itemActions from './item.actions';
import { ItemActionTypes } from '.';
import { Item } from '../../../models/item.model';
import * as recordActions from '../../../store/record.actions';

@Injectable()
export class ItemEffects {

  constructor(private itemService: ItemService,
              private actions$: Actions) { }

  @Effect()
  loadItemList$: Observable<Action> = this.actions$.pipe(
    //catchError(err => of(new itemActions.LoadItemListFail(err))),
    ofType(ItemActionTypes.LoadItemList),
    mergeMap(action =>
      this.itemService.getAll().pipe(
        map(ItemList => (new itemActions.LoadItemListSuccess(ItemList))),
        catchError(err => of(new recordActions.SetError(err)))
      )
    )
  );

  @Effect()
  saveItem$: Observable<Action> = this.actions$.pipe(
    ofType(ItemActionTypes.SaveItem),
    map((action: itemActions.SaveItem) => action.payload),
    mergeMap((item: Item) =>
      this.itemService.put(item.itemId, item).pipe(
        switchMap((updatedItem: any) => [new itemActions.SaveItemSuccess(item),
                                         new recordActions.SaveRecordSuccess()]),
        catchError(err => of(new recordActions.SetError(err)))
      )
    )
  );

  @Effect()
  addItem$: Observable<Action> = this.actions$.pipe(
    ofType(ItemActionTypes.AddItem),
    map((action: itemActions.AddItem) => action.payload),
    mergeMap((item: Item) =>
      this.itemService.post(item).pipe(
        switchMap((newItem:any) => [new itemActions.AddItemSuccess(newItem),
                                    new recordActions.AddRecordSuccess()]),
        catchError(err => of(new recordActions.SetError(err)))
      )
    )
  );

  @Effect()
  deleteItem$: Observable<Action> = this.actions$.pipe(
    ofType(ItemActionTypes.DeleteItem),
    map((action: itemActions.DeleteItem) => action.payload),
    concatMap((itemId: number) =>
      this.itemService.delete(itemId).pipe(
        switchMap((item:any) => [new itemActions.DeleteItemSuccess(item),
                                 new recordActions.DeleteRecordSuccess()]),
        catchError(err => of(new recordActions.SetError(err)))
      )
    )
  );
}
