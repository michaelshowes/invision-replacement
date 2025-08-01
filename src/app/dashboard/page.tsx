import { headers } from 'next/headers';

import LogoutBtn from '@/components/auth/LogoutBtn';
import { auth } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const data = await auth.api.userHasPermission({
    headers: await headers(),
    body: {
      permission: {
        comments: ['create']
      }
    }
  });

  console.log(data);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {session?.user.name}</p>
      <LogoutBtn />
    </div>
  );
}
