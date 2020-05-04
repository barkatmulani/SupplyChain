import { Item } from "../../../models/item.model";

export enum ItemActionTypes {
    SetPageNo = '[Item] Set Page No',
    SetRecordsPerPage = '[Item] Set Records Per Page',
    SetItems = '[Item] Set Items',
    SelectItem = '[Item] Select Item',
    UnselectItem = '[Item] Unselect Item',
    SetNavigateFlag = '[Item] Set New Page Navigation Flag',
    AddItem = '[Item] Add Item',
    AddItemSuccess = '[Item] Add Item Success',
    AddItemFail = '[Item] Add Item Fail',
    LoadItemList = '[Item] Load Item List',
    LoadItemListSuccess = '[Item] Load Item List Success',
    LoadItemListFail = '[Item] Load Item List Fail',
    LoadItem = '[Item] Load Item',
    LoadItemSuccess = '[Item] Load Item Success',
    LoadItemFail = '[Item] Load Item Fail',
    SaveItem = '[Item] Save Item',
    SaveItemSuccess = '[Item] Save Item Success',
    SaveItemFail = '[Item] Save Item Fail',
    DeleteItem = '[Item] Delete Item',
    DeleteItemSuccess = '[Item] Delete Item Success',
    DeleteItemFail = '[Item] Delete Item Fail',
    SetLastActionType = '[Item] Set Last Action Type',
    ResetLastActionType = '[Item] Reset Last Action Type',
    ResetUpdatedItem = '[Item] Reset Updated Item'
};

export interface ItemListState {
    pageNo: number,
    recordsPerPage: number,
    items: Item[],
    itemResult: { items: Item[], error: any }
    selectedItemId: number | null;
    navigationFlag: boolean;
    lastActionType: actionType;
    error: any;
};

export const itemListInitialState: ItemListState = {
    pageNo: 1,
    recordsPerPage: 10,
    items: null,
    itemResult: {items: [], error: {}},
    selectedItemId: null,
    navigationFlag: true,
    lastActionType: '',
    error: null
};

export const itemDetailInitialState : Item = {
    itemId: 0,
    active: true,
    itemDescription: '',
    cost: 0,
    price: 0
};

type actionType = '' | 'A' | 'U' | 'D';