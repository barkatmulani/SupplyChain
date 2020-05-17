export interface Item {
    itemId: number;
    active: boolean;
    itemDescription: string;
    cost: number;
    price: number;
};

export interface ResolvedItem {
    item: Item;
    error?: any;
}