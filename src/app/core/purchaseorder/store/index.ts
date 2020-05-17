import { PurchaseOrder } from "../../../models/purchaseOrder.model";

export enum PurchaseOrderActionTypes {
    SetPageNo = '[PurchaseOrder] Set Page No',
    SetRecordsPerPage = '[PurchaseOrder] Set Records Per Page',
    SetPurchaseOrders = '[PurchaseOrder] Set PurchaseOrders',
    SelectPurchaseOrder = '[PurchaseOrder] Select PurchaseOrder',
    UnselectPurchaseOrder = '[PurchaseOrder] Unselect PurchaseOrder',
    SetNavigateFlag = '[PurchaseOrder] Set New Page Navigation Flag',
    AddPurchaseOrder = '[PurchaseOrder] Add PurchaseOrder',
    AddPurchaseOrderSuccess = '[PurchaseOrder] Add PurchaseOrder Success',
    AddPurchaseOrderFail = '[PurchaseOrder] Add PurchaseOrder Fail',
    LoadPurchaseOrder = '[PurchaseOrder] Load PurchaseOrder',
    LoadPurchaseOrderSuccess = '[PurchaseOrder] Load PurchaseOrder Success',
    LoadPurchaseOrderFail = '[PurchaseOrder] Load PurchaseOrder Fail',
    LoadPurchaseOrderList = '[PurchaseOrder] Load PurchaseOrder List',
    LoadPurchaseOrderListSuccess = '[PurchaseOrder] Load PurchaseOrder List Success',
    LoadPurchaseOrderListFail = '[PurchaseOrder] Load PurchaseOrder List Fail',
    SavePurchaseOrder = '[PurchaseOrder] Save PurchaseOrder',
    SavePurchaseOrderSuccess = '[PurchaseOrder] Save PurchaseOrder Success',
    SavePurchaseOrderFail = '[PurchaseOrder] Save PurchaseOrder Fail',
    DeletePurchaseOrder = '[PurchaseOrder] Delete PurchaseOrder',
    DeletePurchaseOrderSuccess = '[PurchaseOrder] Delete PurchaseOrder Success',
    DeletePurchaseOrderFail = '[PurchaseOrder] Delete PurchaseOrder Fail',
    PostPurchaseOrder = '[PurchaseOrder] Post PurchaseOrder',
    PostPurchaseOrderSuccess = '[PurchaseOrder] Post PurchaseOrder Success',
    PostPurchaseOrderFail = '[PurchaseOrder] Post PurchaseOrder Fail',
    SetLastActionType = '[PurchaseOrder] Set Last Action Type',
    ResetLastActionType = '[PurchaseOrder] Reset Last Action Type',
    ResetUpdatedPurchaseOrder = '[PurchaseOrder] Reset Updated PurchaseOrder'
};

export interface PurchaseOrderListState {
    pageNo: number,
    recordsPerPage: number,
    purchaseOrder: PurchaseOrder,
    purchaseOrders: PurchaseOrder[],
    purchaseOrderResult: { purchaseOrders: PurchaseOrder[], error: any }
    selectedPurchaseOrderId: number | null;
    navigationFlag: boolean;
    error: any;
};

export const purchaseOrderListInitialState: PurchaseOrderListState = {
    pageNo: 1,
    recordsPerPage: 10,
    purchaseOrder: null,
    purchaseOrders: [],
    purchaseOrderResult: {purchaseOrders: [], error: {}},
    selectedPurchaseOrderId: null,
    navigationFlag: true,
    error: null
};

export const purchaseOrderDetailInitialState : PurchaseOrder = {
    purchaseOrderId: 0,
    purchaseOrderDate: null,
    estDeliveryDate: null,
    purchaseOrderTotal: 0,
    shipmentCost: 0,
    inventoryId: null,
    vendorId: null
};
