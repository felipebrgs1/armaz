import {
    pgTable,
    text,
    varchar,
    timestamp,
    uuid,
    primaryKey,
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
