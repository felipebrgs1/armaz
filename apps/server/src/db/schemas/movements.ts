import {
    pgTable,
    text,
    varchar,
    timestamp,
    real,
    uuid,
} from 'drizzle-orm/pg-core';
import { products } from './products';
import { locations } from './locations';
import { users } from '../../modules/user/userModel';

// Histórico de movimentações (entrada/saída)
export const movements = pgTable('movements', {
    id: uuid('id').primaryKey().defaultRandom(),
    productId: uuid('product_id')
        .notNull()
        .references(() => products.id, { onDelete: 'cascade' }),
    locationId: uuid('location_id')
        .notNull()
        .references(() => locations.id, { onDelete: 'cascade' }),
    userId: uuid('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'set null' }),
    type: varchar('type', { length: 10 }).notNull(),
    quantity: real('quantity').notNull(),
    timestamp: timestamp('timestamp', { withTimezone: true }).defaultNow(),
    notes: text('notes'),
});
