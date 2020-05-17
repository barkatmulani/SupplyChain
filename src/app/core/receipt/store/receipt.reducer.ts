import { ReceiptActionTypes, receiptListInitialState, receiptDetailInitialState } from '.';
import { ReceiptListActions } from './receipt.actions';

export function ReceiptReducer (state = receiptListInitialState, action: ReceiptListActions) {
    switch (action.type) {
        case ReceiptActionTypes.SetPageNo:
            return {
                ...state,
                pageNo: action.payload
            }

        case ReceiptActionTypes.SetRecordsPerPage:
            return {
                ...state,
                recordsPerPage: action.payload
            }
    
        case ReceiptActionTypes.SelectReceipt:
            return {
                ...state,
                selectedReceiptId: action.payload
            }
        
        case ReceiptActionTypes.UnselectReceipt:
            return {
                ...state,
                selectedReceiptId: null
            }

        case ReceiptActionTypes.SetNavigateFlag:
            return {
                ...state,
                navigationFlag: action.payload
            }

        case ReceiptActionTypes.LoadReceiptSuccess:
            return {
                ...state,
                receipt: action.payload,
                error: null
            }

        case ReceiptActionTypes.LoadReceiptFail:
            return {
                ...state,
                receipt: null,
                error: action.payload
            };
    
     
        case ReceiptActionTypes.LoadReceiptListSuccess:
            return {
                ...state,
                receipts: action.payload,
                error: null
            }

        case ReceiptActionTypes.LoadReceiptListFail:
            return {
                ...state,
                receipts: null,
                error: action.payload
            };
    
        case ReceiptActionTypes.NewReceipt:
            return {
                ...state,
                receipt: receiptDetailInitialState,
                error: null
            }
        
        case ReceiptActionTypes.AddReceiptSuccess:
            return {
                ...state,
                receipts: [...state.receipts, action.payload],
                updatedReceipt: action.payload,
                error: null
            }

        case ReceiptActionTypes.AddReceiptFail:
            return {
                ...state,
                updatedReceipt: null,
                error: action.payload
            };
    
        case ReceiptActionTypes.SaveReceiptSuccess:
            const receipts = state.receipts.map(
                receipt => action.payload.receiptId === receipt.receiptId ? action.payload : receipt);
            return {
                ...state,
                receipts,
                updatedReceipt: action.payload,
                error: null
            }

        case ReceiptActionTypes.SaveReceiptFail:
            return {
                ...state,
                updatedReceipt: null,
                error: action.payload
            };

        case ReceiptActionTypes.DeleteReceiptSuccess:
            return {
                ...state,
                receipts: state.receipts.filter(receipt => receipt.receiptId !== action.payload.receiptId),
                updatedReceipt: action.payload,
                error: null
            }

        case ReceiptActionTypes.DeleteReceiptFail:
            return {
                ...state,
                updatedReceipt: null,
                error: action.payload
            };
        
        default:
            return state;
    }
}