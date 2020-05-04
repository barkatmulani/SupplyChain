import { Action } from '@ngrx/store';
import { ItemActionTypes } from '.';
import { Item } from '../../../models/item.model';

export class LoadItemList implements Action {
    readonly type = ItemActionTypes.LoadItemList;
}

export class LoadItemListSuccess implements Action {
    readonly type = ItemActionTypes.LoadItemListSuccess;

    constructor(public payload: Item[]) { }
}

export class LoadItemListFail implements Action {
    readonly type = ItemActionTypes.LoadItemListFail;

    constructor(public payload: string) { }
}

export class SetPageNo implements Action {
    readonly type = ItemActionTypes.SetPageNo

    constructor(public payload: number) { }
};

export class SetRecordsPerPage implements Action {
    readonly type = ItemActionTypes.SetRecordsPerPage

    constructor(public payload: number) { }
};

export class SelectItem implements Action {
    readonly type = ItemActionTypes.SelectItem

    constructor(public payload: number) { }
};

export class UnselectItem implements Action {
    readonly type = ItemActionTypes.UnselectItem
};

export class SetNavigationFlag implements Action {
    readonly type = ItemActionTypes.SetNavigateFlag

    constructor(public payload: number) { }
};

export class AddItem implements Action {
    readonly type = ItemActionTypes.AddItem

    constructor(public payload: Item) { }
};

export class AddItemSuccess implements Action {
    readonly type = ItemActionTypes.AddItemSuccess

    constructor(public payload: Item) { }
};

export class AddItemFail implements Action {
    readonly type = ItemActionTypes.AddItemFail

    constructor(public payload: any) { }
};

export class SaveItem implements Action {
    readonly type = ItemActionTypes.SaveItem

    constructor(public payload: Item) { }
};

export class SaveItemSuccess implements Action {
    readonly type = ItemActionTypes.SaveItemSuccess

    constructor(public payload: Item) { }
};

export class SaveItemFail implements Action {
    readonly type = ItemActionTypes.SaveItemFail

    constructor(public payload: any) { }
};

export class DeleteItem implements Action {
    readonly type = ItemActionTypes.DeleteItem

    constructor(public payload: number) { }
};

export class DeleteItemSuccess implements Action {
    readonly type = ItemActionTypes.DeleteItemSuccess

    constructor(public payload: Item) { }
};

export class DeleteItemFail implements Action {
    readonly type = ItemActionTypes.DeleteItemFail

    constructor(public payload: any) { }
};


export class SetLastActionType implements Action {
    readonly type = ItemActionTypes.SetLastActionType;

    constructor(public payload: string) { }
}

export class ResetLastActionType implements Action {
    readonly type = ItemActionTypes.ResetLastActionType
}

export type ItemListActions = SetPageNo
    | SetRecordsPerPage
    | LoadItemList
    | LoadItemListSuccess
    | LoadItemListFail
    | SetNavigationFlag
    | SelectItem
    | UnselectItem
    | AddItem
    | AddItemSuccess
    | AddItemFail
    | SaveItem
    | SaveItemSuccess
    | SaveItemFail
    | DeleteItem
    | DeleteItemSuccess
    | DeleteItemFail
    | SetLastActionType
    | ResetLastActionType;