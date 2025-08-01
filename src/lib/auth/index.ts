import { adminClient, inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

import { ac, roles } from './permissions';
import { auth } from './server';

// Client-side auth client (no database imports)
export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    adminClient({
      roles,
      ac
    })
  ]
});
