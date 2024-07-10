import { VendorActionTypes, VendorListInitialState } from '.';
import { VendorListActions } from './vendor.actions';

export function VendorReducer (state = VendorListInitialState, action: VendorListActions) {
    switch (action.type) {
        case VendorActionTypes.SetPageNo:
            return {
                ...state,
                pageNo: action.payload
            }

        case VendorActionTypes.SetRecordsPerPage:
            return {
                ...state,
                recordsPerPage: action.payload
            }
    
        case VendorActionTypes.SelectVendor:
            return {
                ...state,
                selectedVendorId: action.payload
            }
        
        case VendorActionTypes.UnselectVendor:
            return {
                ...state,
                selectedVendorId: null
            }

        case VendorActionTypes.SetNavigateFlag:
            return {
                ...state,
                navigationFlag: action.payload
            }
 
        case VendorActionTypes.LoadVendorListSuccess:
            return {
                ...state,
                vendors: action.payload,
                error: null
            }

        case VendorActionTypes.LoadVendorListFail:
            return {
                ...state,
                updatedVendor: null,
                error: action.payload
            };
    
        case VendorActionTypes.AddVendorSuccess:
            return {
                ...state,
                vendors: [...state.vendors, action.payload],
                updatedVendor: action.payload,
                error: null
            }

        case VendorActionTypes.AddVendorFail:
            return {
                ...state,
                updatedVendor: null,
                error: action.payload
            };
    
        case VendorActionTypes.SaveVendorSuccess:
            const vendors = state.vendors.map(
                vendor => action.payload.vendorId === vendor.vendorId ? action.payload : vendor);
            return {
                ...state,
                vendors,
                updatedVendor: action.payload,
                error: null
            }

        case VendorActionTypes.SaveVendorFail:
            return {
                ...state,
                updatedVendor: null,
                error: action.payload
            };

        case VendorActionTypes.DeleteVendorSuccess:
            return {
                ...state,
                vendors: state.vendors.filter(vendor => vendor.vendorId !== action.payload.vendorId),
                updatedVendor: action.payload,
                error: null
            }

        case VendorActionTypes.DeleteVendorFail:
            return {
                ...state,
                updatedVendor: null,
                error: action.payload
            };
        
        default:
            return state;
    }
}