import { RecordActionType } from "../../global";

export enum RecordActionTypes {
    SaveRecord = '[Base] Save Record',
    AddRecord = '[Base] Add Record',
    DeleteRecord = '[Base] Delete Record',
    PostRecord = '[Base] Post Record',
    SetLastActionType = '[Base] Set Last Action Type',
    ResetLastActionType = '[Base] Reset Last Action Type',
    SetRecordUpdatedFlag = '[Base] Set Record Updated Flag',
    ResetRecordUpdatedFlag = '[Base] Reset Record Updated Flag',
    AddToNavigationHistory  = '[Base] Add to Navigation History',
    SetError = '[Base] Set Error Message',
    ResetError = '[Base] Reset Error Message',
    history = '[Base] Add to Navigation History'
};

export interface RecordState {
    lastActionType: RecordActionType,
    recordUpdatedFlag: boolean,
    navigationHistory: any[],
    error: any
};

export const recordInitialState: RecordState = {
    lastActionType: RecordActionType.None,
    recordUpdatedFlag: false,
    navigationHistory: [],
    error: null,
};
