export enum RecordActionTypes {
    SetLastActionType = '[Base] Set Last Action Type',
    ResetLastActionType = '[Base] Reset Last Action Type',
    SetRecordUpdatedFlag = '[Base] Set Record Updated Flag',
    ResetRecordUpdatedFlag = '[Base] Reset Record Updated Flag',
    SetNavigationPath  = '[Base] Set Navigation Path',
    ResetNavigationPath  = '[Base] Reset Navigation Path',
    SetError = '[Base] Set Error Message',
    ResetError = '[Base] Reset Error Message'
};

export interface RecordState {
    lastActionType: changeType,
    recordUpdatedFlag: boolean,
    navigationPath: string,
    error: any;
};

export const recordInitialState: RecordState = {
    lastActionType: '',
    recordUpdatedFlag: false,
    navigationPath: '',
    error: null
};

type changeType = '' | 'A' | 'U' | 'D';