import { authClient } from '@/lib/auth-client';

export async function socialSignIn(provider: string) {
  await authClient.signIn.social({
    provider,
    callbackURL: '/app'
  });
}
