'use client';

import { redirect, useRouter } from 'next/navigation';

import { LogOut } from 'lucide-react';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth-client';

import { Button } from '../ui/button';

export default function LogoutBtn() {
  const handleLogout = async () => {
    await authClient.signOut();
    toast.success('Logged out successfully');
    redirect('/auth/login');
  };

  return (
    <Button onClick={handleLogout}>
      Logout
      <LogOut className={'size-4'} />
    </Button>
  );
}
