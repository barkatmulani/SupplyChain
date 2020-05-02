import { VendorListActionTypes, vendorListInitialState } from './vendor-list.constants';
import { VendorListActions } from './vendor-list.actions';

export function vendorListReducer (state = vendorListInitialState, action: VendorListActions) {
    switch (action.type) {
        case VendorListActionTypes.SetPageNo:
            return {
                ...state,
                pageNo: action.payload
            }

        case VendorListActionTypes.SetVendors:
            return {
                ...state,
                vendors: action.payload
            }
            
        default:
            return state;
    }
}