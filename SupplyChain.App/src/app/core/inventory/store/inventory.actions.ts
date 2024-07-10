import { Action } from '@ngrx/store';
import { InventoryActionTypes } from '.';
import { Inventory } from '../../../models/inventory.model';

export class LoadInventoryList implements Action {
    readonly type = InventoryActionTypes.LoadInventoryList;
}

export class LoadInventoryListSuccess implements Action {
    readonly type = InventoryActionTypes.LoadInventoryListSuccess;

    constructor(public payload: Inventory[]) { }
}

export class LoadInventoryListFail implements Action {
    readonly type = InventoryActionTypes.LoadInventoryListFail;

    constructor(public payload: string) { }
}

export class SetPageNo implements Action {
    readonly type = InventoryActionTypes.SetPageNo

    constructor(public payload: number) { }
};

export class SetRecordsPerPage implements Action {
    readonly type = InventoryActionTypes.SetRecordsPerPage

    constructor(public payload: number) { }
};

export class SelectInventory implements Action {
    readonly type = InventoryActionTypes.SelectInventory

    constructor(public payload: number) { }
};

export class UnselectInventory implements Action {
    readonly type = InventoryActionTypes.UnselectInventory
};

export class SetNavigationFlag implements Action {
    readonly type = InventoryActionTypes.SetNavigateFlag

    constructor(public payload: number) { }
};

export class AddInventory implements Action {
    readonly type = InventoryActionTypes.AddInventory

    constructor(public payload: Inventory) { }
};

export class AddInventorySuccess implements Action {
    readonly type = InventoryActionTypes.AddInventorySuccess

    constructor(public payload: Inventory) { }
};

export class AddInventoryFail implements Action {
    readonly type = InventoryActionTypes.AddInventoryFail

    constructor(public payload: any) { }
};

export class SaveInventory implements Action {
    readonly type = InventoryActionTypes.SaveInventory

    constructor(public payload: Inventory) { }
};

export class SaveInventorySuccess implements Action {
    readonly type = InventoryActionTypes.SaveInventorySuccess

    constructor(public payload: Inventory) { }
};

export class SaveInventoryFail implements Action {
    readonly type = InventoryActionTypes.SaveInventoryFail

    constructor(public payload: any) { }
};

export class DeleteInventory implements Action {
    readonly type = InventoryActionTypes.DeleteInventory

    constructor(public payload: number) { }
};

export class DeleteInventorySuccess implements Action {
    readonly type = InventoryActionTypes.DeleteInventorySuccess

    constructor(public payload: Inventory) { }
};

export class DeleteInventoryFail implements Action {
    readonly type = InventoryActionTypes.DeleteInventoryFail

    constructor(public payload: any) { }
};


export class SetLastActionType implements Action {
    readonly type = InventoryActionTypes.SetLastActionType;

    constructor(public payload: string) { }
}

export class ResetLastActionType implements Action {
    readonly type = InventoryActionTypes.ResetLastActionType
}

export type InventoryListActions = SetPageNo
    | SetRecordsPerPage
    | LoadInventoryList
    | LoadInventoryListSuccess
    | LoadInventoryListFail
    | SetNavigationFlag
    | SelectInventory
    | UnselectInventory
    | AddInventory
    | AddInventorySuccess
    | AddInventoryFail
    | SaveInventory
    | SaveInventorySuccess
    | SaveInventoryFail
    | DeleteInventory
    | DeleteInventorySuccess
    | DeleteInventoryFail
    | SetLastActionType
    | ResetLastActionType;