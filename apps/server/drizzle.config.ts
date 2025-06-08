import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./src/db/drizzle",
    dialect: "postgresql",
    dbCredentials: {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT || 5432),
        user: process.env.DB_USER || "teste",
        password: process.env.DB_PASSWORD || "teste123",
        database: process.env.DB_NAME || "postgres",
        ssl: process.env.DB_SSL === "true",
    }
});
