import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { admin } from 'better-auth/plugins';

import { db } from '@/db';
import { schema } from '@/db/schema';

import { ac, roles } from './permissions';

// Server-side auth configuration
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
    schema: schema,
    usePlural: true
  }),
  plugins: [
    admin({
      roles,
      ac
    }),
    nextCookies()
  ], // make sure this is the last plugin in the array
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }
  },
  // Set default redirect URL after successful authentication
  redirectTo: '/dashboard'
});
