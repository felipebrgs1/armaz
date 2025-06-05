import {
    pgTable,
    text,
    varchar,
    timestamp,
    real,
    primaryKey,
    uuid,
    integer,
} from 'drizzle-orm/pg-core';

// Usuários do sistema
export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Funções (admin, operador, etc.)
export const roles = pgTable('roles', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 100 }).notNull().unique(),
});

// Relação N:N entre usuários e funções
export const userRoles = pgTable('user_roles', {
    userId: uuid('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    roleId: uuid('role_id')
        .notNull()
        .references(() => roles.id, { onDelete: 'cascade' }),
}, (table) => ({
    pk: primaryKey({ columns: [table.userId, table.roleId] }),
}));

// Produtos
export const products = pgTable('products', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    sku: varchar('sku', { length: 100 }).unique(),
    description: text('description'),
    unit: varchar('unit', { length: 20 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Locais de armazenamento
export const locations = pgTable('locations', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 100 }).notNull().unique(),
    description: text('description'),
});

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
