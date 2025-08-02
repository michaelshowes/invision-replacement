import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { organization } from './organization';
import { user } from './user';

export const role = pgEnum('role', ['admin', 'member']);

export type Role = (typeof role.enumValues)[number];

export const member = pgTable('member', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id')
    .notNull()
    .references(() => organization.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  role: role('role').default('member').notNull(),
  createdAt: timestamp('created_at').notNull()
});

export const memberRelations = relations(member, ({ one }) => ({
  organization: one(organization, {
    fields: [member.organizationId],
    references: [organization.id]
  }),
  user: one(user, {
    fields: [member.userId],
    references: [user.id]
  })
}));
