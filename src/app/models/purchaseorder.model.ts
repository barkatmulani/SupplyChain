export interface PurchaseOrder {
    purchaseOrderId: number;
    purchaseOrderDate: Date;
    estDeliveryDate: Date;
    purchaseOrderTotal: number;
    shipmentCost: number;
};

export interface ResolvedPurchaseOrder {
    purchaseOrder: PurchaseOrder;
    error?: any;
}

export interface ResolvedPurchaseOrderList {
    count: number;
}