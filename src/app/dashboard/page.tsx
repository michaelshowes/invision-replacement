import Link from 'next/link';

import { getAllOrganizations } from '@/server/organizations';

export default async function DashboardPage() {
  const organizations = await getAllOrganizations();

  return (
    <div>
      <h1>Clients</h1>

      <div>
        {organizations.map((organization) => (
          <div key={organization.id}>
            <Link href={`/dashboard/clients/${organization.slug}`}>
              {organization.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
