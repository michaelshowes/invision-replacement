import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import CreateOrganizationForm from '@/components/auth/CreateOrganizationForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/lib/auth';

export default async function CreateOrganizationPage() {
  const organizations = await auth.api.listOrganizations({
    headers: await headers()
  });

  if (organizations.length > 0) {
    redirect('/app');
  }

  return (
    <div className='flex h-full w-full items-center justify-center p-8'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle>Create Organization</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateOrganizationForm />
        </CardContent>
      </Card>
    </div>
  );
}
