import { RecordActionTypes, recordInitialState, RecordState } from '.';
import { RecordListActions } from './record.actions';

export function RecordListReducer(state = recordInitialState, action: RecordListActions) {
    switch (action.type) {
        case RecordActionTypes.SetLastActionType:
            return {
                ...state,
                lastActionType: action.payload,
                error: null
        }
    
        case RecordActionTypes.ResetLastActionType:
            return {
                ...state,
                lastActionType: '',
                error: null
        }

        case RecordActionTypes.SetRecordUpdatedFlag:
            return {
                ...state,
                recordUpdatedFlag: true,
                error: null
            };

        case RecordActionTypes.ResetRecordUpdatedFlag:
            return {
                ...state,
                recordUpdatedFlag: false,
                error: null
            };

        case RecordActionTypes.SetNavigationPath:
            return {
                ...state,
                navigationPath: action.payload,
                error: null
            };

        case RecordActionTypes.ResetNavigationPath:
            return {
                ...state,
                navigationPath: '',
                error: null
            };
    
        case RecordActionTypes.SetError:
            return {
                ...state,
                error: action.payload
            };

        case RecordActionTypes.ResetError:
            debugger;
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
}