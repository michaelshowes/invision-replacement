import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { createAuthClient } from 'better-auth/react';

import { db } from '@/db';

// your drizzle instance

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg' // or "mysql", "sqlite"
  }),
  plugins: [nextCookies()], // make sure this is the last plugin in the array
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }
  }
});

export const { signIn, signUp, signOut, useSession } = createAuthClient();
