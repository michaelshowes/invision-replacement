import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { schema } from '@/db/schema/_index';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

const client = postgres(process.env.DATABASE_URL, {
  max: 10, // Maximum number of connections in the pool
  idle_timeout: 20, // Close idle connections after 20 seconds
  connect_timeout: 10, // Connection timeout in seconds
  max_lifetime: 60 * 30 // Close connections after 30 minutes
});

export const db = drizzle(client, { schema });
