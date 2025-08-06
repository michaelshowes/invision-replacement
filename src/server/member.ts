'use server';

import { Role } from '@/db/schema/auth/_index';
import { auth } from '@/lib/auth';

import { isAdmin } from './permission';

export async function addMember(
  organizationId: string,
  userId: string,
  role: Role
) {
  try {
    await auth.api.addMember({
      body: {
        userId,
        role,
        organizationId
      }
    });

    return {
      success: true,
      message: `Member added successfully to ${organizationId}`
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: `Failed to add member to ${organizationId}`
    };
  }
}

export async function removeMember(organizationId: string, userId: string) {
  const admin = await isAdmin();

  if (!admin) {
    return {
      success: false,
      message: 'You are not authorized to remove members'
    };
  }

  try {
    await auth.api.removeMember({
      body: {
        memberIdOrEmail: userId,
        organizationId
      }
    });

    return {
      success: true,
      message: `Member removed successfully from ${organizationId}`
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: `Failed to remove member from ${organizationId}`
    };
  }
}
