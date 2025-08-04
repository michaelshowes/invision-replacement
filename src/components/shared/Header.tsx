import { headers } from 'next/headers';

import CreateOrganizationForm from '@/components/auth/CreateOrganizationForm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { auth } from '@/lib/auth';

import LogoutBtn from '../auth/LogoutBtn';
import InvitationBtn from '../email/InvitationBtn';

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  console.log(session?.user);

  return (
    <header className={'p-4'}>
      <div className={'flex items-center justify-between gap-2'}>
        <p>Welcome {session?.user.name}</p>
        {/* <InvitationBtn
        email={'mshowes@okidigital.io'}
        role={'member'}
        organizationId={'qsswKYuxR4bgEY7h7rdk8Z4nmD4MP4Rw'}
      /> */}
        {/* <Dialog>
        <DialogTrigger asChild>
          <Button>Create Organization</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Organization</DialogTitle>
            <DialogDescription>
              Create a new organization to get started.
            </DialogDescription>
          </DialogHeader>
          <CreateOrganizationForm />
        </DialogContent>
      </Dialog> */}
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarImage src={session?.user.image || ''} />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className={'flex flex-col'}>
            <LogoutBtn />
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
