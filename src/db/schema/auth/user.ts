import { relations } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { member } from './member';

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  initials: text('initials'),
  image: text('image'),
  emailVerified: boolean('email_verified')
    .$defaultFn(() => false)
    .notNull(),
  isAdmin: boolean('is_admin')
    .$defaultFn(() => false)
    .notNull(),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull()
});

export const userRelations = relations(user, ({ many }) => ({
  memberships: many(member)
}));
