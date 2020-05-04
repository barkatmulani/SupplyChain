export interface Inventory {
    inventoryId: number;
    active: boolean;
    inventoryDescription: string;
    address: string;
};

export interface ResolvedInventoryList {
    count: number
    // inventories: Inventory[],
    // error?: any;
}

export interface ResolvedInventory {
    inventory: Inventory;
    error?: any;
}