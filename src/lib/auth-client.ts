import {
  adminClient,
  inferAdditionalFields,
  inferOrgAdditionalFields,
  organizationClient
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

import { auth } from './auth';
import { ac, roles } from './permissions';

// Client-side auth client (no database imports)
export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    // adminClient({
    //   roles,
    //   ac
    // }),
    organizationClient({
      schema: inferOrgAdditionalFields<typeof auth>()
    })
  ]
});
