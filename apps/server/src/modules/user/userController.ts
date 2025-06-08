import { db } from '@db/index';
import { users } from './userModel';
import { eq } from 'drizzle-orm';

export async function getUserById(id: string) {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
}

export async function createUser(data: { name: string; email: string, passwordHash: string }) {
    const result = await db.insert(users).values(data).returning();
    return result[0];
}