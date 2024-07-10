import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PurchaseOrderListState } from ".";

export const purchaseOrderSelector = createFeatureSelector<PurchaseOrderListState>('purchaseOrder');

export class PurchaseOrderSelectors {
    static getPageNo = createSelector(
        purchaseOrderSelector,
        state => state.pageNo
    );

    static getRecordsPerPage = createSelector(
        purchaseOrderSelector,
        state => state.recordsPerPage
    );

    static getPurchaseOrder = createSelector(
        purchaseOrderSelector,
        state => state.purchaseOrder
    );

    static getPurchaseOrders = createSelector(
        purchaseOrderSelector,
        state => state.purchaseOrders
    );

    static selectedPurchaseOrderId = createSelector(
        purchaseOrderSelector,
        state => state.selectedPurchaseOrderId
    );

    static navigationFlag = createSelector(
        purchaseOrderSelector,
        state => state.navigationFlag
    );

    static error = createSelector(
        purchaseOrderSelector,
        state => state.error
    );

}