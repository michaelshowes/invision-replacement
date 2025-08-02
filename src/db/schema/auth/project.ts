import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { organization } from './organization';
import { user } from './user';

const project = pgTable('project', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  organizationId: text('organization_id')
    .notNull()
    .references(() => organization.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at')
});

const projectRelations = relations(project, ({ one }) => ({
  organization: one(organization, {
    fields: [project.organizationId],
    references: [organization.id]
  })
}));

const projectMember = pgTable('project_member', {
  id: text('id').primaryKey(),
  projectId: text('project_id')
    .notNull()
    .references(() => project.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at')
});

const projectMemberRelations = relations(projectMember, ({ one }) => ({
  project: one(project, {
    fields: [projectMember.projectId],
    references: [project.id]
  }),
  user: one(user, {
    fields: [projectMember.userId],
    references: [user.id]
  })
}));

export { project, projectRelations, projectMember, projectMemberRelations };
