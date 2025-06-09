import { db } from '@db/index';
import { products } from './productModel';
import { eq } from 'drizzle-orm';

export async function getProductById(id: string) {
    const result = await db.select().from(products).where(eq(products.id, id));
    return result[0];
}

export async function getAllProducts() {
    const result = await db.select().from(products);
    return result;
}

export async function createProduct(data: { name: string; sku?: string; description?: string; unit: string }) {
    const result = await db.insert(products).values(data).returning();
    return result[0];
}

export async function updateProduct(id: string, data: Partial<{ name: string; sku: string; description: string; unit: string }>) {
    const result = await db.update(products).set(data).where(eq(products.id, id)).returning();
    return result[0];
}

export async function deleteProduct(id: string) {
    const result = await db.delete(products).where(eq(products.id, id)).returning();
    return result[0];
}
