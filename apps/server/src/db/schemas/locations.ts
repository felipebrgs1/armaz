import {
    pgTable,
    text,
    varchar,
    uuid,
} from 'drizzle-orm/pg-core';

// Locais de armazenamento
export const locations = pgTable('locations', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 100 }).notNull().unique(),
    description: text('description'),
});
