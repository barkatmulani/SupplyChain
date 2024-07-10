export interface Vendor {
    vendorId: number;
    active: boolean;
    vendorName: string;
    address: string;
    phoneNo: string;
};

export interface ResolvedVendor {
    vendor: Vendor;
    error?: any;
}