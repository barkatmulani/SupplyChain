import { Vendor } from "../../../models/Vendor.model";

export enum VendorActionTypes {
    SetPageNo = '[Vendor] Set Page No',
    SetRecordsPerPage = '[Vendor] Set Records Per Page',
    SetVendors = '[Vendor] Set Vendors',
    SelectVendor = '[Vendor] Select Vendor',
    UnselectVendor = '[Vendor] Unselect Vendor',
    SetNavigateFlag = '[Vendor] Set New Page Navigation Flag',
    AddVendor = '[Vendor] Add Vendor',
    AddVendorSuccess = '[Vendor] Add Vendor Success',
    AddVendorFail = '[Vendor] Add Vendor Fail',
    LoadVendorList = '[Vendor] Load Vendor List',
    LoadVendorListSuccess = '[Vendor] Load Vendor List Success',
    LoadVendorListFail = '[Vendor] Load Vendor List Fail',
    LoadVendor = '[Vendor] Load Vendor',
    LoadVendorSuccess = '[Vendor] Load Vendor Success',
    LoadVendorFail = '[Vendor] Load Vendor Fail',
    SaveVendor = '[Vendor] Save Vendor',
    SaveVendorSuccess = '[Vendor] Save Vendor Success',
    SaveVendorFail = '[Vendor] Save Vendor Fail',
    DeleteVendor = '[Vendor] Delete Vendor',
    DeleteVendorSuccess = '[Vendor] Delete Vendor Success',
    DeleteVendorFail = '[Vendor] Delete Vendor Fail',
    SetLastActionType = '[Vendor] Set Last Action Type',
    ResetLastActionType = '[Vendor] Reset Last Action Type',
    ResetUpdatedVendor = '[Vendor] Reset Updated Vendor'
};

export interface VendorListState {
    pageNo: number,
    recordsPerPage: number,
    vendors: Vendor[],
    vendorResult: { Vendors: Vendor[], error: any }
    selectedVendorId: number | null;
    navigationFlag: boolean;
    lastActionType: actionType;
    error: any;
};

export const VendorListInitialState: VendorListState = {
    pageNo: 1,
    recordsPerPage: 10,
    vendors: null,
    vendorResult: {Vendors: [], error: {}},
    selectedVendorId: null,
    navigationFlag: true,
    lastActionType: '',
    error: null
};

export const VendorDetailInitialState : Vendor = {
    vendorId: 0,
    active: true,
    vendorName: '',
    address: '',
    phoneNo: ''
};

type actionType = '' | 'A' | 'U' | 'D';