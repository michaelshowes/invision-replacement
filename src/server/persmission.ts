'use server';

import { headers } from 'next/headers';

import { auth } from '@/lib/auth';

export async function isAdmin() {
  const { success, error } = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        member: ['create', 'update', 'delete'],
        organization: ['update', 'delete']
      }
    }
  });

  if (error) {
    return {
      success: false,
      error: error || 'Failed to check permission'
    };
  }

  return success;
}
