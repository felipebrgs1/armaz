import { db } from '@db/index';
import { movements } from './movementModel';
import { products } from '../product/productModel';
import { locations } from '../location/locationModel';
import { users } from '../user/userModel';
import { eq, desc } from 'drizzle-orm';

export async function getMovementById(id: string) {
    const result = await db
        .select({
            id: movements.id,
            productId: movements.productId,
            locationId: movements.locationId,
            userId: movements.userId,
            type: movements.type,
            quantity: movements.quantity,
            timestamp: movements.timestamp,
            notes: movements.notes,
            productName: products.name,
            locationName: locations.name,
            userName: users.name,
        })
        .from(movements)
        .leftJoin(products, eq(movements.productId, products.id))
        .leftJoin(locations, eq(movements.locationId, locations.id))
        .leftJoin(users, eq(movements.userId, users.id))
        .where(eq(movements.id, id));
    return result[0];
}

export async function getAllMovements() {
    const result = await db
        .select({
            id: movements.id,
            productId: movements.productId,
            locationId: movements.locationId,
            userId: movements.userId,
            type: movements.type,
            quantity: movements.quantity,
            timestamp: movements.timestamp,
            notes: movements.notes,
            productName: products.name,
            locationName: locations.name,
            userName: users.name,
        })
        .from(movements)
        .leftJoin(products, eq(movements.productId, products.id))
        .leftJoin(locations, eq(movements.locationId, locations.id))
        .leftJoin(users, eq(movements.userId, users.id))
        .orderBy(desc(movements.timestamp));
    return result;
}

export async function getMovementsByProduct(productId: string) {
    const result = await db
        .select({
            id: movements.id,
            productId: movements.productId,
            locationId: movements.locationId,
            userId: movements.userId,
            type: movements.type,
            quantity: movements.quantity,
            timestamp: movements.timestamp,
            notes: movements.notes,
            productName: products.name,
            locationName: locations.name,
            userName: users.name,
        })
        .from(movements)
        .leftJoin(products, eq(movements.productId, products.id))
        .leftJoin(locations, eq(movements.locationId, locations.id))
        .leftJoin(users, eq(movements.userId, users.id))
        .where(eq(movements.productId, productId))
        .orderBy(desc(movements.timestamp));
    return result;
}

export async function getMovementsByLocation(locationId: string) {
    const result = await db
        .select({
            id: movements.id,
            productId: movements.productId,
            locationId: movements.locationId,
            userId: movements.userId,
            type: movements.type,
            quantity: movements.quantity,
            timestamp: movements.timestamp,
            notes: movements.notes,
            productName: products.name,
            locationName: locations.name,
            userName: users.name,
        })
        .from(movements)
        .leftJoin(products, eq(movements.productId, products.id))
        .leftJoin(locations, eq(movements.locationId, locations.id))
        .leftJoin(users, eq(movements.userId, users.id))
        .where(eq(movements.locationId, locationId))
        .orderBy(desc(movements.timestamp));
    return result;
}

export async function createMovement(data: {
    productId: string;
    locationId: string;
    userId: string;
    type: string;
    quantity: number;
    notes?: string;
}) {
    const result = await db.insert(movements).values(data).returning();
    return result[0];
}

export async function deleteMovement(id: string) {
    const result = await db.delete(movements).where(eq(movements.id, id)).returning();
    return result[0];
}
