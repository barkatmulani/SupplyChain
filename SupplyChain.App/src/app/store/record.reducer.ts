import { RecordActionTypes, recordInitialState, RecordState } from '.';
import { RecordListActions } from './record.actions';
import { RecordActionType } from '../../global';

export function RecordListReducer(state = recordInitialState, action: RecordListActions) {
    switch (action.type) {
        case RecordActionTypes.SaveRecord:
            return {
                ...state,
                lastActionType: RecordActionType.Update,
                error: null
        }

        case RecordActionTypes.AddRecord:
            return {
                ...state,
                lastActionType: RecordActionType.Add,
                error: null
        }

        case RecordActionTypes.DeleteRecord:
            return {
                ...state,
                lastActionType: RecordActionType.Delete,
                error: null
        }

        case RecordActionTypes.PostRecord:
            return {
                ...state,
                lastActionType: RecordActionType.Post,
                error: null
        }

        case RecordActionTypes.SetLastActionType:
            return {
                ...state,
                lastActionType: action.payload,
                error: null
        }
    
        case RecordActionTypes.ResetLastActionType:
            return {
                ...state,
                lastActionType: RecordActionType.None,
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

        case RecordActionTypes.AddToNavigationHistory:
            return {
                ...state,
                navigationHistory: [...state.navigationHistory, action.payload],
                error: null
            };

        case RecordActionTypes.SetError:
            return {
                ...state,
                error: action.payload
            };

        case RecordActionTypes.ResetError:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
}