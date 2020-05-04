import { Action } from '@ngrx/store';
import { RecordActionTypes } from '.';

export class SaveRecordSuccess implements Action {
    readonly type = RecordActionTypes.SaveRecord;
}

export class AddRecordSuccess implements Action {
    readonly type = RecordActionTypes.AddRecord;
}

export class DeleteRecordSuccess implements Action {
    readonly type = RecordActionTypes.DeleteRecord;
}

export class SetLastActionType implements Action {
    readonly type = RecordActionTypes.SetLastActionType;

    constructor(public payload: string) { }
}

export class ResetLastActionType implements Action {
    readonly type = RecordActionTypes.ResetLastActionType
}

export class SetRecordUpdatedFlag implements Action {
    readonly type = RecordActionTypes.SetRecordUpdatedFlag;
}

export class ResetRecordUpdatedFlag implements Action {
    readonly type = RecordActionTypes.ResetRecordUpdatedFlag
}

export class AddToNavigationHistory implements Action {
    readonly type = RecordActionTypes.AddToNavigationHistory;

    constructor(public payload: string) { }
}

export class SetError implements Action {
    readonly type = RecordActionTypes.SetError

    constructor(public payload: any) { }
}

export class ResetError implements Action {
    readonly type = RecordActionTypes.ResetError
}

export type RecordListActions = SetLastActionType
    | SaveRecordSuccess
    | AddRecordSuccess
    | DeleteRecordSuccess
    | ResetLastActionType
    | SetRecordUpdatedFlag
    | ResetRecordUpdatedFlag
    | AddToNavigationHistory
    | SetError
    | ResetError;