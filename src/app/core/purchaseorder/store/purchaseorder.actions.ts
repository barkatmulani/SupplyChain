import { Action } from '@ngrx/store';
import { PurchaseOrderActionTypes } from '.';
import { PurchaseOrder } from '../../../models/purchaseOrder.model';

export class LoadPurchaseOrder implements Action {
    readonly type = PurchaseOrderActionTypes.LoadPurchaseOrder;

    constructor(public payload: number) { }
}

export class LoadPurchaseOrderSuccess implements Action {
    readonly type = PurchaseOrderActionTypes.LoadPurchaseOrderSuccess;

    constructor(public payload: PurchaseOrder) { }
}

export class LoadPurchaseOrderFail implements Action {
    readonly type = PurchaseOrderActionTypes.LoadPurchaseOrderFail;

    constructor(public payload: string) { }
}

export class LoadPurchaseOrderList implements Action {
    readonly type = PurchaseOrderActionTypes.LoadPurchaseOrderList;
}

export class LoadPurchaseOrderListSuccess implements Action {
    readonly type = PurchaseOrderActionTypes.LoadPurchaseOrderListSuccess;

    constructor(public payload: PurchaseOrder[]) { }
}

export class LoadPurchaseOrderListFail implements Action {
    readonly type = PurchaseOrderActionTypes.LoadPurchaseOrderListFail;

    constructor(public payload: string) { }
}

export class SetPageNo implements Action {
    readonly type = PurchaseOrderActionTypes.SetPageNo

    constructor(public payload: number) { }
};

export class SetRecordsPerPage implements Action {
    readonly type = PurchaseOrderActionTypes.SetRecordsPerPage

    constructor(public payload: number) { }
};

export class SelectPurchaseOrder implements Action {
    readonly type = PurchaseOrderActionTypes.SelectPurchaseOrder

    constructor(public payload: number) { }
};

export class UnselectPurchaseOrder implements Action {
    readonly type = PurchaseOrderActionTypes.UnselectPurchaseOrder
};

export class SetNavigationFlag implements Action {
    readonly type = PurchaseOrderActionTypes.SetNavigateFlag

    constructor(public payload: number) { }
};

export class AddPurchaseOrder implements Action {
    readonly type = PurchaseOrderActionTypes.AddPurchaseOrder

    constructor(public payload: PurchaseOrder) { }
};

export class AddPurchaseOrderSuccess implements Action {
    readonly type = PurchaseOrderActionTypes.AddPurchaseOrderSuccess

    constructor(public payload: PurchaseOrder) { }
};

export class AddPurchaseOrderFail implements Action {
    readonly type = PurchaseOrderActionTypes.AddPurchaseOrderFail

    constructor(public payload: any) { }
};

export class SavePurchaseOrder implements Action {
    readonly type = PurchaseOrderActionTypes.SavePurchaseOrder

    constructor(public payload: PurchaseOrder) { }
};

export class SavePurchaseOrderSuccess implements Action {
    readonly type = PurchaseOrderActionTypes.SavePurchaseOrderSuccess

    constructor(public payload: PurchaseOrder) { }
};

export class SavePurchaseOrderFail implements Action {
    readonly type = PurchaseOrderActionTypes.SavePurchaseOrderFail

    constructor(public payload: any) { }
};

export class DeletePurchaseOrder implements Action {
    readonly type = PurchaseOrderActionTypes.DeletePurchaseOrder

    constructor(public payload: number) { }
};

export class DeletePurchaseOrderSuccess implements Action {
    readonly type = PurchaseOrderActionTypes.DeletePurchaseOrderSuccess

    constructor(public payload: PurchaseOrder) { }
};

export class DeletePurchaseOrderFail implements Action {
    readonly type = PurchaseOrderActionTypes.DeletePurchaseOrderFail

    constructor(public payload: any) { }
};

export class PostPurchaseOrder implements Action {
    readonly type = PurchaseOrderActionTypes.PostPurchaseOrder

    constructor(public payload: number) { }
};

export class PostPurchaseOrderSuccess implements Action {
    readonly type = PurchaseOrderActionTypes.PostPurchaseOrderSuccess

    constructor(public payload: PurchaseOrder) { }
};

export class PostPurchaseOrderFail implements Action {
    readonly type = PurchaseOrderActionTypes.PostPurchaseOrderFail

    constructor(public payload: any) { }
};


export class SetLastActionType implements Action {
    readonly type = PurchaseOrderActionTypes.SetLastActionType;

    constructor(public payload: string) { }
}

export class ResetLastActionType implements Action {
    readonly type = PurchaseOrderActionTypes.ResetLastActionType
}

export type PurchaseOrderListActions = SetPageNo
    | SetRecordsPerPage
    | LoadPurchaseOrder
    | LoadPurchaseOrderSuccess
    | LoadPurchaseOrderFail
    | LoadPurchaseOrderList
    | LoadPurchaseOrderListSuccess
    | LoadPurchaseOrderListFail
    | SetNavigationFlag
    | SelectPurchaseOrder
    | UnselectPurchaseOrder
    | AddPurchaseOrder
    | AddPurchaseOrderSuccess
    | AddPurchaseOrderFail
    | SavePurchaseOrder
    | SavePurchaseOrderSuccess
    | SavePurchaseOrderFail
    | DeletePurchaseOrder
    | DeletePurchaseOrderSuccess
    | DeletePurchaseOrderFail
    | PostPurchaseOrder
    | PostPurchaseOrderSuccess
    | PostPurchaseOrderFail
    | SetLastActionType
    | ResetLastActionType;