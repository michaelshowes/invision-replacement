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
  organization: [...standardStatements],
  section: [...standardStatements],
  comment: [...standardStatements]
} as const;

export const ac = createAccessControl(statements);

export const roles = {
  // ADMIN
  admin: ac.newRole({
    ...adminAc.statements,
    organization: [...standardStatements],
    section: [...standardStatements],
    comment: [...standardStatements]
  }),

  // MEMBER
  member: ac.newRole({
    organization: ['read:own', 'update:own'],
    section: ['read:own'],
    comment: ['create', 'read', 'read:own', 'update:own', 'delete:own']
  })
} as const;
