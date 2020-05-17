export interface Receipt {
    receiptId: number;
    active: boolean;
    statusId: number;
    receiptDate: string;
    receiptTotal: number;
    purchaseOrderId: number;
    inventoryId: number;
    vendorId: number;
    estDeliveryDate: string;
    extraCost: number;
    receiptItem: any[];
}

export interface ResolvedReceipt {
    receipt: Receipt;
    error?: any;
}

export interface ResolvedReceiptList {
    count: number;
}