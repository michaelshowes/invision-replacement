import { createAccessControl } from 'better-auth/plugins/access';
import {
  adminAc,
  defaultStatements
} from 'better-auth/plugins/organization/access';

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
  organizations: [...standardStatements],
  comments: [...standardStatements],
  projects: [...standardStatements]
} as const;

export const ac = createAccessControl(statements);

export const roles = {
  // ADMIN
  admin: ac.newRole({
    ...adminAc.statements,
    organizations: [...standardStatements],
    comments: [...standardStatements],
    projects: [...standardStatements]
  }),

  // MEMBER
  member: ac.newRole({
    organizations: ['read:own', 'update:own'],
    comments: ['create', 'read', 'read:own', 'update:own', 'delete:own'],
    projects: ['read:own']
  })
} as const;
