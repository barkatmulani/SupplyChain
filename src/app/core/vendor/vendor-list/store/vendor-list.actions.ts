import { Action } from '@ngrx/store';
import { VendorListActionTypes } from './vendor-list.constants';

export class SetPageNo implements Action {
    readonly type = VendorListActionTypes.SetPageNo;

    constructor(public payload: number) { }
};

export class vendors implements Action {
    readonly type = VendorListActionTypes.SetVendors

    constructor(public payload: any[]) { }
};

export type VendorListActions =
    SetPageNo |
    vendors;