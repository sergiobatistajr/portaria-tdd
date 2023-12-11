import { Pool, PoolConfig } from "pg";

const configurations = {
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  idleTimeoutMillis: 20000,
  connectionTimeoutMillis: 20000,
  allowExitOnIdle: false,
  max: 10,
} satisfies PoolConfig;

const pool = new Pool(configurations);
async function sql(queryObject: string, values?: any[]) {
  try {
    const result = await pool.query(queryObject, values);
    return result;
  } catch (error) {
    console.error("Database query error", error);
    throw error;
  }
}

export default Object.freeze({
  sql,
});
