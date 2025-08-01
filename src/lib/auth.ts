import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { admin, organization } from 'better-auth/plugins';

import InvitationEmail from '@/components/email/InvitationEmail';
import { db } from '@/db';
import { schema } from '@/db/schema/_index';

import { ac, roles } from './permissions';
import { resend } from './resend';

// Server-side auth configuration
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
    schema: schema,
    usePlural: true
  }),
  plugins: [
    // admin({
    //   roles,
    //   ac
    // }),
    organization({
      ac,
      roles,
      creatorRole: 'admin',
      async sendInvitationEmail(data) {
        const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/api/accept-invitation/${data.id}`;

        resend.emails.send({
          from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
          to: data.email,
          subject: `You've been invited to join ${data.organization.name}`,
          react: InvitationEmail({
            email: data.email,
            invitedByUsername: data.inviter.user.name,
            invitedByEmail: data.inviter.user.email,
            teamName: data.organization.name,
            inviteLink
          })
        });
      }
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
