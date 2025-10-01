import pg from "pg";

const { Pool } = pg;

const databaseUrl =
  process.env.DATABASE_URL || "postgres://app:app@localhost:5432/ideas";

if (!process.env.DATABASE_URL) {
  // Helpful log for local runs; container sets DATABASE_URL via compose
  console.log(
    "DATABASE_URL not set. Falling back to postgres://app:app@localhost:5432/ideas"
  );
}

export const pool = new Pool({ connectionString: databaseUrl });

export async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ideas (
      id SERIAL PRIMARY KEY,
      text VARCHAR(280) NOT NULL,
      votes INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);
}
