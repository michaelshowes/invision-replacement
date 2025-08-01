import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth/server';

/**
 * Redirects to the dashboard if the user is already logged in
 */
export async function sessionRedirect() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (session) {
    redirect('/dashboard');
  }
}
