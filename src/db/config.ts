import { neon } from '@neondatabase/serverless';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { schema } from '@/db/schema/_index';

export type DatabaseProvider = 'postgres' | 'neon';

interface DatabaseConfig {
  provider: DatabaseProvider;
  url: string;
  postgres?: {
    max?: number;
    idle_timeout?: number;
    connect_timeout?: number;
    max_lifetime?: number;
  };
}

export function createDatabaseClient(config: DatabaseConfig) {
  if (!config.url) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  switch (config.provider) {
    case 'neon':
      const sql = neon(config.url);
      return drizzleNeon(sql, { schema });

    case 'postgres':
    default:
      const client = postgres(config.url, {
        max: config.postgres?.max ?? 10,
        idle_timeout: config.postgres?.idle_timeout ?? 20,
        connect_timeout: config.postgres?.connect_timeout ?? 10,
        max_lifetime: config.postgres?.max_lifetime ?? 60 * 30
      });
      return drizzle(client, { schema });
  }
}

// Default configuration based on environment
export function getDatabaseConfig(): DatabaseConfig {
  const provider =
    (process.env.DATABASE_PROVIDER as DatabaseProvider) ||
    (process.env.NODE_ENV === 'production' ? 'neon' : 'postgres');

  return {
    provider,
    url: process.env.DATABASE_URL!,
    postgres: {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
      max_lifetime: 60 * 30
    }
  };
}
