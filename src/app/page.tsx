import { headers } from 'next/headers';

import { auth } from '@/lib/auth';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session) {
    return <div>Not authenticated</div>;
  }
  return (
    <div>
      <h1>Welcome {session.user.name}</h1>
    </div>
  );
}
