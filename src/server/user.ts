'use server';

import { auth } from '@/lib/auth';

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
        name,
        firstName: '',
        lastName: '',
        isAdmin: false
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
