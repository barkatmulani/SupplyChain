export enum VendorListActionTypes {
    SetPageNo = '[Vendor List] Set Page No',
    SetVendors = '[Vendor List] Set vendors'
};

export interface VendorListState {
    pageNo: number,
    vendors: any[]
};

export const vendorListInitialState: VendorListState = {
    pageNo: 1,
    vendors: []
};