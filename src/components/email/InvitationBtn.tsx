'use client';

import { Role } from '@/db/schema/auth/member';
import { authClient } from '@/lib/auth-client';

import { Button } from '../ui/button';

export default function InvitationBtn({
  email,
  role,
  organizationId
}: {
  email: string;
  role: Role;
  organizationId: string;
}) {
  async function handleInvite() {
    const { data, error } = await authClient.organization.inviteMember({
      email,
      role,
      organizationId
    });

    console.log(data, error);
  }

  return <Button onClick={handleInvite}>Send Invitation</Button>;
}
