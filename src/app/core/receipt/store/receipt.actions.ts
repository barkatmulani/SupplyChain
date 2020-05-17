import { Action } from '@ngrx/store';
import { ReceiptActionTypes } from '.';
import { Receipt } from '../../../models/receipt.model';

export class NewReceipt implements Action {
    readonly type = ReceiptActionTypes.NewReceipt;
}

export class LoadReceipt implements Action {
    readonly type = ReceiptActionTypes.LoadReceipt;

    constructor(public payload: number) { }
}

export class LoadReceiptSuccess implements Action {
    readonly type = ReceiptActionTypes.LoadReceiptSuccess;

    constructor(public payload: Receipt) { }
}

export class LoadReceiptFail implements Action {
    readonly type = ReceiptActionTypes.LoadReceiptFail;

    constructor(public payload: string) { }
}

export class LoadReceiptList implements Action {
    readonly type = ReceiptActionTypes.LoadReceiptList;
}

export class LoadReceiptListSuccess implements Action {
    readonly type = ReceiptActionTypes.LoadReceiptListSuccess;

    constructor(public payload: Receipt[]) { }
}

export class LoadReceiptListFail implements Action {
    readonly type = ReceiptActionTypes.LoadReceiptListFail;

    constructor(public payload: string) { }
}

export class SetPageNo implements Action {
    readonly type = ReceiptActionTypes.SetPageNo

    constructor(public payload: number) { }
};

export class SetRecordsPerPage implements Action {
    readonly type = ReceiptActionTypes.SetRecordsPerPage

    constructor(public payload: number) { }
};

export class SelectReceipt implements Action {
    readonly type = ReceiptActionTypes.SelectReceipt

    constructor(public payload: number) { }
};

export class UnselectReceipt implements Action {
    readonly type = ReceiptActionTypes.UnselectReceipt
};

export class SetNavigationFlag implements Action {
    readonly type = ReceiptActionTypes.SetNavigateFlag

    constructor(public payload: number) { }
};

export class AddReceipt implements Action {
    readonly type = ReceiptActionTypes.AddReceipt

    constructor(public payload: Receipt) { }
};

export class AddReceiptSuccess implements Action {
    readonly type = ReceiptActionTypes.AddReceiptSuccess

    constructor(public payload: Receipt) { }
};

export class AddReceiptFail implements Action {
    readonly type = ReceiptActionTypes.AddReceiptFail

    constructor(public payload: any) { }
};

export class SaveReceipt implements Action {
    readonly type = ReceiptActionTypes.SaveReceipt

    constructor(public payload: Receipt) { }
};

export class SaveReceiptSuccess implements Action {
    readonly type = ReceiptActionTypes.SaveReceiptSuccess

    constructor(public payload: Receipt) { }
};

export class SaveReceiptFail implements Action {
    readonly type = ReceiptActionTypes.SaveReceiptFail

    constructor(public payload: any) { }
};

export class DeleteReceipt implements Action {
    readonly type = ReceiptActionTypes.DeleteReceipt

    constructor(public payload: number) { }
};

export class DeleteReceiptSuccess implements Action {
    readonly type = ReceiptActionTypes.DeleteReceiptSuccess

    constructor(public payload: Receipt) { }
};

export class DeleteReceiptFail implements Action {
    readonly type = ReceiptActionTypes.DeleteReceiptFail

    constructor(public payload: any) { }
};

export class PostReceipt implements Action {
    readonly type = ReceiptActionTypes.PostReceipt

    constructor(public payload: number) { }
};

export class PostReceiptSuccess implements Action {
    readonly type = ReceiptActionTypes.PostReceiptSuccess

    constructor(public payload: Receipt) { }
};

export class PostReceiptFail implements Action {
    readonly type = ReceiptActionTypes.PostReceiptFail

    constructor(public payload: any) { }
};


export class SetLastActionType implements Action {
    readonly type = ReceiptActionTypes.SetLastActionType;

    constructor(public payload: string) { }
}

export class ResetLastActionType implements Action {
    readonly type = ReceiptActionTypes.ResetLastActionType
}

export type ReceiptListActions = SetPageNo
    | SetRecordsPerPage
    | LoadReceipt
    | LoadReceiptSuccess
    | LoadReceiptFail
    | LoadReceiptList
    | LoadReceiptListSuccess
    | LoadReceiptListFail
    | SetNavigationFlag
    | SelectReceipt
    | UnselectReceipt
    | NewReceipt
    | AddReceipt
    | AddReceiptSuccess
    | AddReceiptFail
    | SaveReceipt
    | SaveReceiptSuccess
    | SaveReceiptFail
    | DeleteReceipt
    | DeleteReceiptSuccess
    | DeleteReceiptFail
    | PostReceipt
    | PostReceiptSuccess
    | PostReceiptFail
    | SetLastActionType
    | ResetLastActionType;