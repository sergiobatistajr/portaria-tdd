import { Client } from "pg";

async function sql(queryObject: string, values?: any[]) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });
  try {
    await client.connect();
    const result = await client.query(queryObject, values);
    return result;
  } catch (error) {
    console.error("Database query error", error);
    throw error;
  } finally {
    await client.end();
  }
}

export default sql;
