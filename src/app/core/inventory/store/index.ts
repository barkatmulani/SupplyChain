import { Inventory } from "../../../models/inventory.model";

export enum InventoryActionTypes {
    SetPageNo = '[Inventory] Set Page No',
    SetRecordsPerPage = '[Inventory] Set Records Per Page',
    SetInventorys = '[Inventory] Set Inventories',
    SelectInventory = '[Inventory] Select Inventory',
    UnselectInventory = '[Inventory] Unselect Inventory',
    SetNavigateFlag = '[Inventory] Set New Page Navigation Flag',
    AddInventory = '[Inventory] Add Inventory',
    AddInventorySuccess = '[Inventory] Add Inventory Success',
    AddInventoryFail = '[Inventory] Add Inventory Fail',
    LoadInventoryList = '[Inventory] Load Inventory List',
    LoadInventoryListSuccess = '[Inventory] Load Inventory List Success',
    LoadInventoryListFail = '[Inventory] Load Inventory List Fail',
    LoadInventory = '[Inventory] Load Inventory',
    LoadInventorySuccess = '[Inventory] Load Inventory Success',
    LoadInventoryFail = '[Inventory] Load Inventory Fail',
    SaveInventory = '[Inventory] Save Inventory',
    SaveInventorySuccess = '[Inventory] Save Inventory Success',
    SaveInventoryFail = '[Inventory] Save Inventory Fail',
    DeleteInventory = '[Inventory] Delete Inventory',
    DeleteInventorySuccess = '[Inventory] Delete Inventory Success',
    DeleteInventoryFail = '[Inventory] Delete Inventory Fail',
    SetLastActionType = '[Inventory] Set Last Action Type',
    ResetLastActionType = '[Inventory] Reset Last Action Type',
    ResetUpdatedInventory = '[Inventory] Reset Updated Inventory'
};

export interface InventoryListState {
    pageNo: number,
    recordsPerPage: number,
    inventories: Inventory[],
    inventoryResult: { inventories: Inventory[], error: any }
    selectedInventoryId: number | null;
    navigationFlag: boolean;
    lastActionType: actionType;
    error: any;
};

export const inventoryListInitialState: InventoryListState = {
    pageNo: 1,
    recordsPerPage: 10,
    inventories: null,
    inventoryResult: {inventories: [], error: {}},
    selectedInventoryId: null,
    navigationFlag: true,
    lastActionType: '',
    error: null
};

export const inventoryDetailInitialState : Inventory = {
    inventoryId: 0,
    active: true,
    inventoryDescription: '',
    address: ''
};

type actionType = '' | 'A' | 'U' | 'D';