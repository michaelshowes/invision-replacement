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
  trustedOrigins: ['https://localhost:3000'],
  user: {
    additionalFields: {
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      isAdmin: { type: 'boolean' }
    }
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: schema
  }),
  plugins: [
    organization({
      teams: { enabled: true },
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
      },
      schema: {
        team: {
          modelName: 'project',
          additionalFields: {
            prefix: { type: 'string' }
          }
        },
        teamMember: {
          modelName: 'projectMember',
          fields: { teamId: 'projectId' }
        },
        invitation: {
          fields: { teamId: 'projectId' }
        },
        session: {
          fields: { activeTeamId: 'activeProjectId' }
        }
      }
    }),
    nextCookies()
  ], // make sure this is the last plugin in the array
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    },
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID!,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
      tenantId: process.env.MICROSOFT_TENANT_ID!
    }
    // slack: {
    //   clientId: process.env.SLACK_CLIENT_ID!,
    //   clientSecret: process.env.SLACK_CLIENT_SECRET!
    // }
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 10 * 60 // 10 minutes
    }
  },
  // Set default redirect URL after successful authentication
  redirectTo: '/app'
});
