import { relations } from 'drizzle-orm';
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { section } from './section';

const screen = pgTable('screen', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  order: integer('order'),
  sectionId: text('section_id')
    .notNull()
    .references(() => section.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull()
});

const screenRelations = relations(screen, ({ one }) => ({
  section: one(section, {
    fields: [screen.sectionId],
    references: [section.id]
  })
}));

export { screen, screenRelations };
