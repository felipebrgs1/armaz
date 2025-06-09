import {
    pgTable,
    real,
    primaryKey,
    uuid,
} from 'drizzle-orm/pg-core';
import { products } from '../product/productModel';
import { locations } from '../location/locationModel';

// Estoque atual por produto/local
export const inventory = pgTable('inventory', {
    productId: uuid('product_id')
        .notNull()
        .references(() => products.id, { onDelete: 'cascade' }),
    locationId: uuid('location_id')
        .notNull()
        .references(() => locations.id, { onDelete: 'cascade' }),
    quantity: real('quantity').notNull().default(0),
}, (table) => ({
    pk: primaryKey({ columns: [table.productId, table.locationId] }),
}));
