import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
const { Client } = pkg;
import * as schema from "../shared/schema.ts";

// Use DATABASE_URL for connection (Supabase or any PostgreSQL)
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is required");
}

console.log("Database ready (on-demand connection mode)");

// Create on-demand database connection
export async function getDbConnection() {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is required");
  }
  
  const client = new Client({
    connectionString: databaseUrl,
    ssl: databaseUrl.includes('supabase.co') || databaseUrl.includes('neon.tech')
      ? { rejectUnauthorized: false }
      : undefined,
  });

  await client.connect();
  return { client, db: drizzle(client, { schema }) };
}

// Helper to execute database operations with auto-cleanup
export async function withDb<T>(callback: (db: ReturnType<typeof drizzle>) => Promise<T>): Promise<T> {
  const { client, db } = await getDbConnection();
  try {
    return await callback(db);
  } finally {
    await client.end();
  }
}

// Legacy export for compatibility (creates connection on first use)
let cachedDb: ReturnType<typeof drizzle> | null = null;
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(target, prop) {
    throw new Error('Direct db access is deprecated. Use withDb() for on-demand connections.');
  }
});
