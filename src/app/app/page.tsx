import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import CreateProjectBtn from '@/components/CreateProjectBtn';
import { auth } from '@/lib/auth';

export default async function AppRedirect() {
  const organizations = await auth.api.listOrganizations({
    headers: await headers()
  });

  if (organizations.length === 0) {
    redirect('/app/create-organization');
  }

  return (
    <div className={'h-full px-4'}>
      <div>
        <div>Create a new project</div>
        <CreateProjectBtn />
      </div>
    </div>
  );
}
