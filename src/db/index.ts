import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

import { schemas } from '@/db/schema';

// Check if we're in production
const isProduction = process.env.NODE_ENV === 'production';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Create a new client instance with SSL configuration that works in both environments
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction
    ? {
        rejectUnauthorized: true
        // Remove file system dependent SSL configuration
      }
    : false
});

// Connect to the database
await client.connect();

// Create the database instance
export const db = drizzle(client, { schema: schemas });

// Export the client for use in migrations
export { client };
