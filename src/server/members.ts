'use server';

import { Role } from '@/db/schema/auth/users';
import { auth } from '@/lib/auth';

import { isAdmin } from './persmission';

export async function addMembertoClient(
  clientId: string,
  clientName: string,
  userId: string,
  role: Role
) {
  try {
    await auth.api.addMember({
      body: {
        userId,
        role: role === 'user' ? 'member' : role,
        organizationId: clientId
      }
    });

    return {
      success: true,
      message: `Member added successfully to ${clientName}`
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: `Failed to add member to ${clientName}`
    };
  }
}

export async function removeMemberfromClient(
  clientId: string,
  clientName: string,
  userId: string
) {
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
        organizationId: clientId
      }
    });

    return {
      success: true,
      message: `Member removed successfully from ${clientName}`
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: `Failed to remove member from ${clientName}`
    };
  }
}
