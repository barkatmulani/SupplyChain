import { createFeatureSelector, createSelector } from "@ngrx/store";
import { VendorListState } from ".";

export const VendorSelector = createFeatureSelector<VendorListState>('vendor');

export class VendorSelectors {
    static getPageNo = createSelector(
        VendorSelector,
        state => state.pageNo
    );

    static getRecordsPerPage = createSelector(
        VendorSelector,
        state => state.recordsPerPage
    );

    static getVendors = createSelector(
        VendorSelector,
        state => state.vendors
    );

    static selectedVendorId = createSelector(
        VendorSelector,
        state => state.selectedVendorId
    );

    static navigationFlag = createSelector(
        VendorSelector,
        state => state.navigationFlag
    );

    static error = createSelector(
        VendorSelector,
        state => state.error
    );

}