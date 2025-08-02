import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

export default async function AppRedirect() {
  const organizations = await auth.api.listOrganizations({
    headers: await headers()
  });

  if (organizations.length === 0) {
    redirect('/app/create-organization');
  }

  return <div>AppRedirect</div>;
}
