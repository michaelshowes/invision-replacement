import { headers } from 'next/headers';

import { auth } from '@/lib/auth';
import { getCurrentUser } from '@/server/user';

import MainNav from './MainNav';
import UserNav from './UserNav';

export default async function Sidebar() {
  const { user } = await getCurrentUser();

  return (
    <div className={'w-[280px] bg-gray-100 px-2 py-4'}>
      <div className={'flex h-full flex-col gap-4'}>
        <MainNav />
        <UserNav user={user} />
      </div>
    </div>
  );
}
