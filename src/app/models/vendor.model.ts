export interface Vendor {
    vendorId: number;
    vendorDescription: string;
};

export interface ResolvedVendorList {
    vendors: Vendor[],
    error?: any;
}

export interface ResolvedVendor {
    vendor: Vendor;
    error?: any;
}