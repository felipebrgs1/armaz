// src/db/index.ts

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import "dotenv/config";

import * as schema from "./schema"; // importa todos os esquemas definidos

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === "true", // ou `rejectUnauthorized: false` se der erro de certificado
});

export const db = drizzle(pool, { schema });
