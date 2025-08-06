import { headers } from 'next/headers';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { auth } from '@/lib/auth';

import LogoutBtn from '../auth/LogoutBtn';

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <header className={'p-4'}>
      <div className={'flex items-center justify-between gap-2'}>
        <p>Welcome {session?.user.name}</p>
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarImage src={session?.user.image || ''} />
              <AvatarFallback>{session?.user.initials}</AvatarFallback>
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
