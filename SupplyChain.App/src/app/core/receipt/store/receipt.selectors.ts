import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ReceiptListState } from ".";

export const receiptSelector = createFeatureSelector<ReceiptListState>('receipt');

export class ReceiptSelectors {
    static getPageNo = createSelector(
        receiptSelector,
        state => state.pageNo
    );

    static getRecordsPerPage = createSelector(
        receiptSelector,
        state => state.recordsPerPage
    );

    static getReceipt = createSelector(
        receiptSelector,
        state => state.receipt
    );

    static getPurchaseOrderId = createSelector(
        receiptSelector,
        ReceiptSelectors.getReceipt,
        state => state.receipt ? state.receipt.purchaseOrderId : null
    );

    static getReceipts = createSelector(
        receiptSelector,
        state => state.receipts
    );

    static selectedReceiptId = createSelector(
        receiptSelector,
        state => state.selectedReceiptId
    );

    static navigationFlag = createSelector(
        receiptSelector,
        state => state.navigationFlag
    );

    static error = createSelector(
        receiptSelector,
        state => state.error
    );

}