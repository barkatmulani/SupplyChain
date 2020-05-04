import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ItemListState } from "./";

export const itemSelector = createFeatureSelector<ItemListState>('item');

export class ItemSelectors {
    static getPageNo = createSelector(
        itemSelector,
        state => state.pageNo
    );

    static getRecordsPerPage = createSelector(
        itemSelector,
        state => state.recordsPerPage
    );

    static getItems = createSelector(
        itemSelector,
        state => state.items
    );

    static selectedItemId = createSelector(
        itemSelector,
        state => state.selectedItemId
    );

    static navigationFlag = createSelector(
        itemSelector,
        state => state.navigationFlag
    );

    static error = createSelector(
        itemSelector,
        state => state.error
    );

}