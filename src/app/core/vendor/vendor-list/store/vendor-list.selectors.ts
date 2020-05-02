import { createFeatureSelector, createSelector } from "@ngrx/store";
import { VendorListState } from "./vendor-list.constants";

export const vendorListSelector = createFeatureSelector<VendorListState>('vendorList');

export const getPageNo = createSelector(
    vendorListSelector,
    state => state.pageNo
);

export const getVendors = createSelector(
    vendorListSelector,
    state => state.vendors
);