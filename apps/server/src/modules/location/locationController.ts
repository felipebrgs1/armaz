import { db } from '@db/index';
import { locations } from './locationModel';
import { eq } from 'drizzle-orm';

export async function getLocationById(id: string) {
    const result = await db.select().from(locations).where(eq(locations.id, id));
    return result[0];
}

export async function getAllLocations() {
    const result = await db.select().from(locations);
    return result;
}

export async function createLocation(data: { name: string; description?: string }) {
    const result = await db.insert(locations).values(data).returning();
    return result[0];
}

export async function updateLocation(id: string, data: Partial<{ name: string; description: string }>) {
    const result = await db.update(locations).set(data).where(eq(locations.id, id)).returning();
    return result[0];
}

export async function deleteLocation(id: string) {
    const result = await db.delete(locations).where(eq(locations.id, id)).returning();
    return result[0];
}
