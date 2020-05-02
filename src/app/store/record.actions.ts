import { Action } from '@ngrx/store';
import { RecordActionTypes } from '.';

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

export class SetNavigationPath implements Action {
    readonly type = RecordActionTypes.SetNavigationPath;

    constructor(public payload: string) { }
}

export class ResetNavigationPath implements Action {
    readonly type = RecordActionTypes.ResetNavigationPath
}

export class SetError implements Action {
    readonly type = RecordActionTypes.SetError

    constructor(public payload: any) { }
}

export class ResetError implements Action {
    readonly type = RecordActionTypes.ResetError
}

export type RecordListActions = SetLastActionType
    | ResetLastActionType
    | SetRecordUpdatedFlag
    | ResetRecordUpdatedFlag
    | SetNavigationPath
    | ResetNavigationPath
    | SetError
    | ResetError;