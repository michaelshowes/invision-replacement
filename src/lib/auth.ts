import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { organization } from 'better-auth/plugins';

import InvitationEmail from '@/components/email/InvitationEmail';
import { db } from '@/db';
import { schema } from '@/db/schema/_index';
import {
  addAdminToAllorganizations,
  addAllAdminsToNeworganization
} from '@/server/organization';

import { ac, roles } from './permissions';
import { resend } from './resend';

// Server-side auth configuration
export const auth = betterAuth({
  trustedOrigins: [
    'https://localhost:3000',
    'https://invision-replacement.vercel.app/'
  ],
  user: {
    additionalFields: {
      firstName: { type: 'string', input: false },
      lastName: { type: 'string', input: false },
      initials: { type: 'string', input: false },
      isAdmin: { type: 'boolean', input: false }
    }
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: schema
  }),
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const emailDomain = user.email.split('@')[1];

          if (emailDomain === process.env.HOST_ORG_DOMAIN) {
          }

          const isAdmin = () => {
            if (emailDomain === process.env.HOST_ORG_DOMAIN) {
              return true;
            }

            // if (emailDomain === 'okidigital.io') {
            //   return true;
            // }

            if (user.email === 'michael.showes@gmail.com') {
              return true;
            }

            return false;
          };

          return {
            data: {
              ...user,
              firstName: user.name.split(' ')[0],
              lastName: user.name.split(' ')[1],
              initials: user.name.split(' ')[0][0] + user.name.split(' ')[1][0],
              isAdmin: isAdmin()
            }
          };
        },
        after: async (user) => {
          addAdminToAllorganizations(user.id);
        }
      }
    }
  },
  plugins: [
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
            organizationName: data.organization.name,
            email: data.email,
            invitedByUsername: data.inviter.user.name,
            invitedByEmail: data.inviter.user.email,
            inviteLink
          })
        });
      },
      organizationCreation: {
        afterCreate: async ({ organization }) => {
          await addAllAdminsToNeworganization(organization.id);
        }
      }
    }),
    nextCookies()
  ], // make sure this is the last plugin in the array
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      mapProfileToUser: (profile) => {
        return {
          firstName: profile.name.split(' ')[0],
          lastName: profile.name.split(' ')[1]
        };
      }
    },
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID!,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
      tenantId: process.env.MICROSOFT_TENANT_ID!,
      mapProfileToUser: (profile) => {
        return {
          firstName: profile.name.split(' ')[0],
          lastName: profile.name.split(' ')[1]
        };
      }
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

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
