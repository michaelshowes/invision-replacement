import { createAccessControl } from 'better-auth/plugins/access';
import { adminAc, defaultStatements } from 'better-auth/plugins/admin/access';

const standardStatements = [
  'create',
  'read',
  'update',
  'delete',
  'read:own',
  'update:own',
  'delete:own'
] as const;

const statements = {
  ...defaultStatements,
  clients: [...standardStatements],
  comments: [...standardStatements]
} as const;

export const ac = createAccessControl(statements);

export const roles = {
  // ADMIN
  admin: ac.newRole({
    ...adminAc.statements,
    clients: [...standardStatements],
    comments: [...standardStatements]
  }),

  // USER
  user: ac.newRole({
    clients: ['read:own', 'update:own'],
    comments: ['read', 'read:own', 'update:own', 'delete:own']
  })
} as const;
