import { headers } from 'next/headers';

import CreateOrganizationForm from '@/components/auth/CreateOrganizationForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { auth } from '@/lib/auth';
import { getCurrentUser } from '@/server/users';

import LogoutBtn from '../auth/LogoutBtn';
import InvitationBtn from '../email/InvitationBtn';

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  console.log(session);

  return (
    <header>
      <p>Welcome {session?.user.name}</p>
      <LogoutBtn />
      <InvitationBtn
        email={'mshowes@okidigital.io'}
        role={session?.user.role}
        organizationId={'qsswKYuxR4bgEY7h7rdk8Z4nmD4MP4Rw'}
      />
      {session?.user.role === 'admin' && (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Client</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Client</DialogTitle>
              <DialogDescription>
                Create a new client to get started.
              </DialogDescription>
            </DialogHeader>
            <CreateOrganizationForm />
          </DialogContent>
        </Dialog>
      )}
    </header>
  );
}
