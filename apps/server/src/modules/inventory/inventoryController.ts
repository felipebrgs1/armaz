import { db } from '@db/index';
import { inventory } from './inventoryModel';
import { products } from '../product/productModel';
import { locations } from '../location/locationModel';
import { eq, and } from 'drizzle-orm';

export async function getInventoryByProductAndLocation(productId: string, locationId: string) {
    const result = await db
        .select()
        .from(inventory)
        .where(and(eq(inventory.productId, productId), eq(inventory.locationId, locationId)));
    return result[0];
}

export async function getInventoryByProduct(productId: string) {
    const result = await db
        .select({
            productId: inventory.productId,
            locationId: inventory.locationId,
            quantity: inventory.quantity,
            productName: products.name,
            locationName: locations.name,
        })
        .from(inventory)
        .leftJoin(products, eq(inventory.productId, products.id))
        .leftJoin(locations, eq(inventory.locationId, locations.id))
        .where(eq(inventory.productId, productId));
    return result;
}

export async function getInventoryByLocation(locationId: string) {
    const result = await db
        .select({
            productId: inventory.productId,
            locationId: inventory.locationId,
            quantity: inventory.quantity,
            productName: products.name,
            locationName: locations.name,
        })
        .from(inventory)
        .leftJoin(products, eq(inventory.productId, products.id))
        .leftJoin(locations, eq(inventory.locationId, locations.id))
        .where(eq(inventory.locationId, locationId));
    return result;
}

export async function getAllInventory() {
    const result = await db
        .select({
            productId: inventory.productId,
            locationId: inventory.locationId,
            quantity: inventory.quantity,
            productName: products.name,
            locationName: locations.name,
        })
        .from(inventory)
        .leftJoin(products, eq(inventory.productId, products.id))
        .leftJoin(locations, eq(inventory.locationId, locations.id));
    return result;
}

export async function updateInventory(productId: string, locationId: string, quantity: number) {
    const result = await db
        .insert(inventory)
        .values({ productId, locationId, quantity })
        .onConflictDoUpdate({
            target: [inventory.productId, inventory.locationId],
            set: { quantity },
        })
        .returning();
    return result[0];
}

export async function deleteInventory(productId: string, locationId: string) {
    const result = await db
        .delete(inventory)
        .where(and(eq(inventory.productId, productId), eq(inventory.locationId, locationId)))
        .returning();
    return result[0];
}
