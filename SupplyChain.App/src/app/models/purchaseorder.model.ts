export interface PurchaseOrder {
    purchaseOrderId: number;
    purchaseOrderDate: string;
    estDeliveryDate: string;
    purchaseOrderTotal: number;
    vendorId: number;
    inventoryId: number;
    shipmentCost: number;
    purchaseOrderItem?: any[];
};

export interface ResolvedPurchaseOrder {
    purchaseOrder: PurchaseOrder;
    error?: any;
}

export interface ResolvedPurchaseOrderList {
    count: number;
}