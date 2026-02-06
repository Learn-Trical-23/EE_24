import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = async <T>(text: string, params: unknown[] = []) => {
  const result = await pool.query<T>(text, params);
  return result.rows;
};
