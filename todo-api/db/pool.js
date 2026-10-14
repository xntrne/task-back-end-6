import fs from "node:fs";
import path from "node:path";
import pg from "pg";

process.loadEnvFile();

const schemaPath = path.join(import.meta.dirname, "schema.sql");

export const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

export async function initDatabase() {
  await pool.query(fs.readFileSync(schemaPath, "utf-8"));
}
