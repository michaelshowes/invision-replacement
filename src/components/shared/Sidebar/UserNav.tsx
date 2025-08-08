'use client';

import { redirect } from 'next/navigation';

import { EllipsisVertical, LogOut } from 'lucide-react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { User } from '@/lib/auth';
import { authClient } from '@/lib/auth-client';

function UserInfo({ user }: { user: User }) {
  return (
    <div className={'flex items-center gap-2'}>
      <Avatar className={'rounded-lg'}>
        <AvatarImage src={user.image || ''} />
        <AvatarFallback className={'text-black'}>
          {user.initials}
        </AvatarFallback>
      </Avatar>
      <div className={'flex flex-col items-start'}>
        <p className={'text-sm font-bold'}>{user.name}</p>
        <p className={'text-xs'}>{user.email}</p>
      </div>
    </div>
  );
}

export default function UserNav({ user }: { user: User }) {
  async function handleLogout() {
    await authClient.signOut();
    toast.success('Logged out successfully');
    redirect('/auth/login');
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={
          'mt-auto flex w-full items-center justify-between gap-2 rounded-sm p-2 transition-colors hover:bg-gray-200'
        }
      >
        <UserInfo user={user} />
        <EllipsisVertical size={14} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={'right'}
        align={'end'}
        sideOffset={4}
      >
        <DropdownMenuLabel>
          <UserInfo user={user} />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button
            onClick={handleLogout}
            className={'flex w-full items-center gap-2 text-left'}
          >
            <LogOut />
            Sign Out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
