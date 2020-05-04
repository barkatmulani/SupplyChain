import { Action } from '@ngrx/store';
import { VendorActionTypes } from '.';
import { Vendor } from '../../../models/Vendor.model';

export class LoadVendorList implements Action {
    readonly type = VendorActionTypes.LoadVendorList;
}

export class LoadVendorListSuccess implements Action {
    readonly type = VendorActionTypes.LoadVendorListSuccess;

    constructor(public payload: Vendor[]) { }
}

export class LoadVendorListFail implements Action {
    readonly type = VendorActionTypes.LoadVendorListFail;

    constructor(public payload: string) { }
}

export class SetPageNo implements Action {
    readonly type = VendorActionTypes.SetPageNo

    constructor(public payload: number) { }
};

export class SetRecordsPerPage implements Action {
    readonly type = VendorActionTypes.SetRecordsPerPage

    constructor(public payload: number) { }
};

export class SelectVendor implements Action {
    readonly type = VendorActionTypes.SelectVendor

    constructor(public payload: number) { }
};

export class UnselectVendor implements Action {
    readonly type = VendorActionTypes.UnselectVendor
};

export class SetNavigationFlag implements Action {
    readonly type = VendorActionTypes.SetNavigateFlag

    constructor(public payload: number) { }
};

export class AddVendor implements Action {
    readonly type = VendorActionTypes.AddVendor

    constructor(public payload: Vendor) { }
};

export class AddVendorSuccess implements Action {
    readonly type = VendorActionTypes.AddVendorSuccess

    constructor(public payload: Vendor) { }
};

export class AddVendorFail implements Action {
    readonly type = VendorActionTypes.AddVendorFail

    constructor(public payload: any) { }
};

export class SaveVendor implements Action {
    readonly type = VendorActionTypes.SaveVendor

    constructor(public payload: Vendor) { }
};

export class SaveVendorSuccess implements Action {
    readonly type = VendorActionTypes.SaveVendorSuccess

    constructor(public payload: Vendor) { }
};

export class SaveVendorFail implements Action {
    readonly type = VendorActionTypes.SaveVendorFail

    constructor(public payload: any) { }
};

export class DeleteVendor implements Action {
    readonly type = VendorActionTypes.DeleteVendor

    constructor(public payload: number) { }
};

export class DeleteVendorSuccess implements Action {
    readonly type = VendorActionTypes.DeleteVendorSuccess

    constructor(public payload: Vendor) { }
};

export class DeleteVendorFail implements Action {
    readonly type = VendorActionTypes.DeleteVendorFail

    constructor(public payload: any) { }
};


export class SetLastActionType implements Action {
    readonly type = VendorActionTypes.SetLastActionType;

    constructor(public payload: string) { }
}

export class ResetLastActionType implements Action {
    readonly type = VendorActionTypes.ResetLastActionType
}

export type VendorListActions = SetPageNo
    | SetRecordsPerPage
    | LoadVendorList
    | LoadVendorListSuccess
    | LoadVendorListFail
    | SetNavigationFlag
    | SelectVendor
    | UnselectVendor
    | AddVendor
    | AddVendorSuccess
    | AddVendorFail
    | SaveVendor
    | SaveVendorSuccess
    | SaveVendorFail
    | DeleteVendor
    | DeleteVendorSuccess
    | DeleteVendorFail
    | SetLastActionType
    | ResetLastActionType;