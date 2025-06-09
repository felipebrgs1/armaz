import * as InventoryController from './inventoryController';

export const inventoryResolver = {
    Query: {
        inventory: (_: any, { productId, locationId }: { productId: string; locationId: string }) =>
            InventoryController.getInventoryByProductAndLocation(productId, locationId),
        inventoryByProduct: (_: any, { productId }: { productId: string }) =>
            InventoryController.getInventoryByProduct(productId),
        inventoryByLocation: (_: any, { locationId }: { locationId: string }) =>
            InventoryController.getInventoryByLocation(locationId),
        allInventory: () => InventoryController.getAllInventory(),
    },
    Mutation: {
        updateInventory: (_: any, { productId, locationId, quantity }: { productId: string; locationId: string; quantity: number }) =>
            InventoryController.updateInventory(productId, locationId, quantity),
        deleteInventory: (_: any, { productId, locationId }: { productId: string; locationId: string }) =>
            InventoryController.deleteInventory(productId, locationId),
    },
};
