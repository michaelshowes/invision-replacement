import { headers } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import InvitationBtn from '@/components/email/InvitationBtn';
import CreateSection from '@/components/section/CreateSection';
import { auth } from '@/lib/auth';
import { getOrganizationBySlug } from '@/server/organization';
import { getSections } from '@/server/section';

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

  const sections = await getSections(organization.id);

  return (
    <>
      <h1>{organization.name}</h1>
      <CreateSection
        organizationId={organization.id}
        name='New Section'
      />
      {sections.data?.map((section) => (
        <Link
          key={section.id}
          href={`/app/organizations/${organizationSlug}/${section.id}`}
        >
          {section.name}
        </Link>
      ))}
      {/* <InvitationBtn
        email={'mshowes@okidigital.io'}
        role={'member'}
        organizationId={organization.id}
      /> */}
    </>
  );
}
