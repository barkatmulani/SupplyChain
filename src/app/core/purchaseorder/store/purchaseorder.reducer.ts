import { PurchaseOrderActionTypes, purchaseOrderListInitialState } from '.';
import { PurchaseOrderListActions } from './purchaseorder.actions';

export function PurchaseOrderReducer (state = purchaseOrderListInitialState, action: PurchaseOrderListActions) {
    switch (action.type) {
        case PurchaseOrderActionTypes.SetPageNo:
            return {
                ...state,
                pageNo: action.payload
            }

        case PurchaseOrderActionTypes.SetRecordsPerPage:
            return {
                ...state,
                recordsPerPage: action.payload
            }
    
        case PurchaseOrderActionTypes.SelectPurchaseOrder:
            return {
                ...state,
                selectedPurchaseOrderId: action.payload
            }
        
        case PurchaseOrderActionTypes.UnselectPurchaseOrder:
            return {
                ...state,
                selectedPurchaseOrderId: null
            }

        case PurchaseOrderActionTypes.SetNavigateFlag:
            return {
                ...state,
                navigationFlag: action.payload
            }

        case PurchaseOrderActionTypes.LoadPurchaseOrderSuccess:
            return {
                ...state,
                purchaseOrder: action.payload,
                error: null
            }

        case PurchaseOrderActionTypes.LoadPurchaseOrderFail:
            return {
                ...state,
                purchaseOrder: null,
                error: action.payload
            };
    
     
        case PurchaseOrderActionTypes.LoadPurchaseOrderListSuccess:
            return {
                ...state,
                purchaseOrders: action.payload,
                error: null
            }

        case PurchaseOrderActionTypes.LoadPurchaseOrderListFail:
            return {
                ...state,
                purcahseOrders: null,
                error: action.payload
            };
    
        case PurchaseOrderActionTypes.AddPurchaseOrderSuccess:
            return {
                ...state,
                purchaseOrders: [...state.purchaseOrders, action.payload],
                updatedPurchaseOrder: action.payload,
                error: null
            }

        case PurchaseOrderActionTypes.AddPurchaseOrderFail:
            return {
                ...state,
                updatedPurchaseOrder: null,
                error: action.payload
            };
    
        case PurchaseOrderActionTypes.SavePurchaseOrderSuccess:
            const purchaseOrders = state.purchaseOrders.map(
                purchaseOrder => action.payload.purchaseOrderId === purchaseOrder.purchaseOrderId ? action.payload : purchaseOrder);
            return {
                ...state,
                purchaseOrders,
                updatedPurchaseOrder: action.payload,
                error: null
            }

        case PurchaseOrderActionTypes.SavePurchaseOrderFail:
            return {
                ...state,
                updatedPurchaseOrder: null,
                error: action.payload
            };

        case PurchaseOrderActionTypes.DeletePurchaseOrderSuccess:
            return {
                ...state,
                purchaseOrders: state.purchaseOrders.filter(purchaseOrder => purchaseOrder.purchaseOrderId !== action.payload.purchaseOrderId),
                updatedPurchaseOrder: action.payload,
                error: null
            }

        case PurchaseOrderActionTypes.DeletePurchaseOrderFail:
            return {
                ...state,
                updatedPurchaseOrder: null,
                error: action.payload
            };
        
        default:
            return state;
    }
}