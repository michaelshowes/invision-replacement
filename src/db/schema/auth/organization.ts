import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { member } from './member';
import { project } from './project';

export const organization = pgTable('organization', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').unique(),
  logo: text('logo'),
  createdAt: timestamp('created_at').notNull(),
  metadata: text('metadata')
});

export const organizationRelations = relations(organization, ({ many }) => ({
  members: many(member),
  projects: many(project)
}));
