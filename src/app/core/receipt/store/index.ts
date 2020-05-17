import { Receipt } from "../../../models/receipt.model";
import { Global } from "../../../../global";

export enum ReceiptActionTypes {
    SetPageNo = '[Receipt] Set Page No',
    SetRecordsPerPage = '[Receipt] Set Records Per Page',
    SetReceipts = '[Receipt] Set Receipts',
    SelectReceipt = '[Receipt] Select Receipt',
    UnselectReceipt = '[Receipt] Unselect Receipt',
    SetNavigateFlag = '[Receipt] Set New Page Navigation Flag',
    NewReceipt = '[Receipt] New Receipt',
    AddReceipt = '[Receipt] Add Receipt',
    AddReceiptSuccess = '[Receipt] Add Receipt Success',
    AddReceiptFail = '[Receipt] Add Receipt Fail',
    LoadReceipt = '[Receipt] Load Receipt',
    LoadReceiptSuccess = '[Receipt] Load Receipt Success',
    LoadReceiptFail = '[Receipt] Load Receipt Fail',
    LoadReceiptList = '[Receipt] Load Receipt List',
    LoadReceiptListSuccess = '[Receipt] Load Receipt List Success',
    LoadReceiptListFail = '[Receipt] Load Receipt List Fail',
    SaveReceipt = '[Receipt] Save Receipt',
    SaveReceiptSuccess = '[Receipt] Save Receipt Success',
    SaveReceiptFail = '[Receipt] Save Receipt Fail',
    DeleteReceipt = '[Receipt] Delete Receipt',
    DeleteReceiptSuccess = '[Receipt] Delete Receipt Success',
    DeleteReceiptFail = '[Receipt] Delete Receipt Fail',
    SetLastActionType = '[Receipt] Set Last Action Type',
    ResetLastActionType = '[Receipt] Reset Last Action Type',
    ResetUpdatedReceipt = '[Receipt] Reset Updated Receipt',
    PostReceipt = '[Receipt] Post Receipt',
    PostReceiptSuccess = '[Receipt] Post Receipt Success',
    PostReceiptFail = '[Receipt] Post Receipt Fail'
};

export interface ReceiptListState {
    pageNo: number,
    recordsPerPage: number,
    receipt: Receipt,
    receipts: Receipt[],
    receiptResult: { receipts: Receipt[], error: any }
    selectedReceiptId: number | null;
    navigationFlag: boolean;
    error: any;
};

export const receiptDetailInitialState : Receipt = {
    receiptId: 0,
    active: true,
    statusId: 0,
    receiptDate: Global.getCurrentDate(),
    receiptTotal: 0,
    purchaseOrderId: null,
    inventoryId: 0,
    vendorId: 0,
    estDeliveryDate: '',
    extraCost: 0,
    receiptItem: []
};

export const receiptListInitialState: ReceiptListState = {
    pageNo: 1,
    recordsPerPage: 10,
    receipt: receiptDetailInitialState,
    receipts: [],
    receiptResult: {receipts: [], error: {}},
    selectedReceiptId: null,
    navigationFlag: true,
    error: null
};

