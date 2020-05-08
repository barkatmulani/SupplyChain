import { createFeatureSelector, createSelector } from "@ngrx/store";
import { InventoryListState } from ".";

export const inventorySelector = createFeatureSelector<InventoryListState>('inventory');

export class inventorySelectors {
    static getPageNo = createSelector(
        inventorySelector,
        state => state.pageNo
    );

    static getRecordsPerPage = createSelector(
        inventorySelector,
        state => state.recordsPerPage
    );

    static getInventories = createSelector(
        inventorySelector,
        state => state.inventories
    );

    static selectedInventoryId = createSelector(
        inventorySelector,
        state => state.selectedInventoryId
    );

    static navigationFlag = createSelector(
        inventorySelector,
        state => state.navigationFlag
    );

    static error = createSelector(
        inventorySelector,
        state => state.error
    );

}