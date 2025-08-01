'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { users } from '@/db/schema/auth/_index';
import { auth } from '@/lib/auth';

/**
 * Get the current user and session.
 * @returns The current user and session.
 * @throws Redirects to login if the user is not authenticated.
 */
export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  // if (!session) {
  //   redirect('/auth/login');
  // }

  const currentUser = await db.query.users.findFirst({
    where: eq(users.id, session?.user.id || '')
  });

  // if (!currentUser) {
  //   redirect('/auth/login');
  // }

  const organizations = await auth.api.listOrganizations({
    headers: await headers()
  });

  return {
    ...session,
    currentUser,
    organizations
  };
}

/**
 * Sign in a user with email and password.
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @returns A success message if the user is signed in, otherwise an error message.
 */
export async function signIn(email: string, password: string) {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password
      }
    });

    return {
      success: true,
      message: 'Signed in successfully'
    };
  } catch (error) {
    const e = error as Error;

    return {
      success: false,
      message: e.message || 'An unknown error occurred'
    };
  }
}

/**
 * Sign up a user with email, password, and name.
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @param name - The name of the user.
 * @returns A success message if the user is signed up, otherwise an error message.
 */
export async function signUp(email: string, password: string, name: string) {
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name
      }
    });

    return {
      success: true,
      message: 'Signed up successfully'
    };
  } catch (error) {
    const e = error as Error;

    return {
      success: false,
      message: e.message || 'An unknown error occurred'
    };
  }
}
