import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

export default async function AppRedirect() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const organizations = await auth.api.listOrganizations({
    headers: await headers()
  });

  if (!session) {
    redirect('/auth/login');
  }

  if (!organizations.length) {
    return (
      <div>
        <p>
          You are not currently a member of any organizations. Please contact
          your administrator to be added to an organization.
        </p>
      </div>
    );
  }

  if (!session.user.isAdmin) {
    redirect(`/app/organizations/${organizations[0].slug}`);
  } else {
    redirect(`/app/dashboard`);
  }
}
