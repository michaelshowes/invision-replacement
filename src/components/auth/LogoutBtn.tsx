'use client';

import { useRouter } from 'next/navigation';

import { LogOut } from 'lucide-react';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth-client';

import { Button } from '../ui/button';

export default function LogoutBtn() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success('Logged out successfully');
    router.push('/auth/login');
  };

  return (
    <Button onClick={handleLogout}>
      Logout
      <LogOut className={'size-4'} />
    </Button>
  );
}
