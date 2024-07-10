export interface Inventory {
    inventoryId: number;
    active: boolean;
    inventoryDescription: string;
    address: string;
};

export interface ResolvedInventory {
    inventory: Inventory;
    error?: any;
}