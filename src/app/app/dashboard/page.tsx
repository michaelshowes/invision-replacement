import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import CreateorganizationBtn from '@/components/auth/CreateOrganizationBtn';
import DeleteOrganization from '@/components/auth/DeleteOrganization';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user.isAdmin) {
    redirect('/app');
  }

  const organizations = await auth.api.listOrganizations({
    headers: await headers()
  });

  return (
    <div>
      <header className={'mb-4 flex items-center justify-between'}>
        <h1>organizations</h1>
        <CreateorganizationBtn />
      </header>

      <div className={'flex w-full gap-8'}>
        {organizations.map((organization) => (
          <Card
            key={organization.id}
            className={'relative'}
          >
            <CardContent>
              <Link href={`/app/organizations/${organization.slug}`}>
                <span className={'absolute inset-0'} />
                <span className={'sr-only'}>Go to organization Page</span>
              </Link>
              <div>
                <Image
                  src={'https://placehold.co/300x300'}
                  alt={organization.name}
                  width={300}
                  height={300}
                  unoptimized
                />
              </div>
            </CardContent>
            <CardHeader className={'flex items-center justify-between'}>
              <CardTitle>{organization.name}</CardTitle>
              <DeleteOrganization
                className={'z-10'}
                organizationId={organization.id}
              />
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
