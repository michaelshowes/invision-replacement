import { relations } from 'drizzle-orm';
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { project } from './auth/project';

const section = pgTable('section', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  order: integer('order'),
  projectId: text('project_id')
    .notNull()
    .references(() => project.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull()
});

const sectionRelations = relations(section, ({ one }) => ({
  project: one(project, {
    fields: [section.projectId],
    references: [project.id]
  })
}));

export { section, sectionRelations };
