import {
    pgTable,
    text,
    varchar,
    timestamp,
    uuid,
} from 'drizzle-orm/pg-core';

// Produtos
export const products = pgTable('products', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    sku: varchar('sku', { length: 100 }).unique(),
    description: text('description'),
    unit: varchar('unit', { length: 20 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
