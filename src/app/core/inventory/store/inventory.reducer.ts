import { InventoryActionTypes, inventoryListInitialState } from '.';
import { InventoryListActions } from './inventory.actions';

export function InventoryReducer (state = inventoryListInitialState, action: InventoryListActions) {
    switch (action.type) {
        case InventoryActionTypes.SetPageNo:
            return {
                ...state,
                pageNo: action.payload
            }

        case InventoryActionTypes.SetRecordsPerPage:
            return {
                ...state,
                recordsPerPage: action.payload
            }
    
        case InventoryActionTypes.SelectInventory:
            return {
                ...state,
                selectedInventoryId: action.payload
            }
        
        case InventoryActionTypes.UnselectInventory:
            return {
                ...state,
                selectedInventoryId: null
            }

        case InventoryActionTypes.SetNavigateFlag:
            return {
                ...state,
                navigationFlag: action.payload
            }

        // case InventoryActionTypes.SetLastActionType:
        //     return {
        //         ...state,
        //         lastActionType: action.payload
        // }
 
        // case InventoryActionTypes.ResetLastActionType:
        //     return {
        //         ...state,
        //         lastActionType: null
        // }
 
        case InventoryActionTypes.LoadInventoryListSuccess:
            return {
                ...state,
                inventories: action.payload,
                error: null
            }

        case InventoryActionTypes.LoadInventoryListFail:
            return {
                ...state,
                updatedInventory: null,
                error: action.payload
            };
    
        case InventoryActionTypes.AddInventorySuccess:
            return {
                ...state,
                inventories: [...state.inventories, action.payload],
                updatedInventory: action.payload,
                error: null
            }

        case InventoryActionTypes.AddInventoryFail:
            return {
                ...state,
                updatedInventory: null,
                error: action.payload
            };
    
        case InventoryActionTypes.SaveInventorySuccess:
            const inventories = state.inventories.map(
                inventory => action.payload.inventoryId === inventory.inventoryId ? action.payload : inventory);
            return {
                ...state,
                inventories,
                updatedInventory: action.payload,
                error: null
            }

        case InventoryActionTypes.SaveInventoryFail:
            return {
                ...state,
                updatedInventory: null,
                error: action.payload
            };

        case InventoryActionTypes.DeleteInventorySuccess:
            return {
                ...state,
                inventories: state.inventories.filter(inventory => inventory.inventoryId !== action.payload.inventoryId),
                updatedInventory: action.payload,
                error: null
            }

        case InventoryActionTypes.DeleteInventoryFail:
            return {
                ...state,
                updatedInventory: null,
                error: action.payload
            };
        
        default:
            return state;
    }
}