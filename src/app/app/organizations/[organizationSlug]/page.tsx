import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

import InvitationBtn from '@/components/email/InvitationBtn';
import { auth } from '@/lib/auth';
import { getOrganizationBySlug } from '@/server/organization';

interface organizationPageProps {
  organizationSlug: string;
}

export default async function organizationPage({
  params
}: {
  params: Promise<organizationPageProps>;
}) {
  const { organizationSlug } = await params;
  const organization = await getOrganizationBySlug(organizationSlug);
  const memberships = await auth.api.listOrganizations({
    headers: await headers()
  });

  if (!organization) {
    notFound();
  }

  // Check if the current user is a member of this organization
  const isMember = memberships.some(
    (membership) => membership.id === organization.id
  );

  if (!isMember) {
    return <div>You are not a member of this organization</div>;
  }

  return (
    <div>
      <h1>{organization.name}</h1>
      <InvitationBtn
        email={'mshowes@okidigital.io'}
        role={'member'}
        organizationId={organization.id}
      />
    </div>
  );
}
