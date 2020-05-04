import { ItemActionTypes, itemListInitialState } from '.';
import { ItemListActions } from './item.actions';

export function ItemReducer (state = itemListInitialState, action: ItemListActions) {
    switch (action.type) {
        case ItemActionTypes.SetPageNo:
            return {
                ...state,
                pageNo: action.payload
            }

        case ItemActionTypes.SetRecordsPerPage:
            return {
                ...state,
                recordsPerPage: action.payload
            }
    
        case ItemActionTypes.SelectItem:
            return {
                ...state,
                selectedItemId: action.payload
            }
        
        case ItemActionTypes.UnselectItem:
            return {
                ...state,
                selectedItemId: null
            }

        case ItemActionTypes.SetNavigateFlag:
            return {
                ...state,
                navigationFlag: action.payload
            }

        // case ItemActionTypes.SetLastActionType:
        //     return {
        //         ...state,
        //         lastActionType: action.payload
        // }
 
        // case ItemActionTypes.ResetLastActionType:
        //     return {
        //         ...state,
        //         lastActionType: null
        // }
 
        case ItemActionTypes.LoadItemListSuccess:
            return {
                ...state,
                items: action.payload,
                error: null
            }

        case ItemActionTypes.LoadItemListFail:
            return {
                ...state,
                updatedItem: null,
                error: action.payload
            };
    
        case ItemActionTypes.AddItemSuccess:
            return {
                ...state,
                items: [...state.items, action.payload],
                updatedItem: action.payload,
                error: null
            }

        case ItemActionTypes.AddItemFail:
            return {
                ...state,
                updatedItem: null,
                error: action.payload
            };
    
        case ItemActionTypes.SaveItemSuccess:
            const items = state.items.map(
                item => action.payload.itemId === item.itemId ? action.payload : item);
            return {
                ...state,
                items,
                updatedItem: action.payload,
                error: null
            }

        case ItemActionTypes.SaveItemFail:
            return {
                ...state,
                updatedItem: null,
                error: action.payload
            };

        case ItemActionTypes.DeleteItemSuccess:
            return {
                ...state,
                items: state.items.filter(item => item.itemId !== action.payload.itemId),
                updatedItem: action.payload,
                error: null
            }

        case ItemActionTypes.DeleteItemFail:
            return {
                ...state,
                updatedItem: null,
                error: action.payload
            };
        
        default:
            return state;
    }
}