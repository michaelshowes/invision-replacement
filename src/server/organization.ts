'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { organization, user } from '@/db/schema/auth/_index';
import { auth } from '@/lib/auth';
import { generateSlug } from '@/utils/generateSlug';

/**
 * Get all organizations.
 * @returns All organizations.
 */
export async function getAllorganizations() {
  return await db.query.organization.findMany();
}

/**
 * Get a organization by its slug.
 * @param slug - The slug of the organization to get.
 * @returns The organization with the given slug.
 * @throws redirect to the not-found page if the organization is not found.
 */
export async function getOrganizationBySlug(slug: string) {
  const result = await db.query.organization.findFirst({
    where: eq(organization.slug, slug),
    with: {
      members: {
        with: {
          user: true
        }
      },
      sections: true
    }
  });

  if (result === undefined) {
    notFound();
  }

  return result;
}

/**
 * Create a new organization.
 * @param name - The name of the organization.
 * @param logo - The logo of the organization.
 * @returns A success message if the organization is created, otherwise an error message.
 */
export async function createorganization(name: string, logo: string) {
  try {
    const slug = generateSlug(name);
    await auth.api.createOrganization({
      body: {
        name,
        slug,
        logo: logo || undefined,
        keepCurrentActiveOrganization: false
      },
      headers: await headers()
    });

    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

/**
 * Add an admin to all organizations.
 * @param userId - The ID of the user to add as an admin.
 */
export async function addAdminToAllorganizations(userId: string) {
  const isAdmin = await db.query.user.findFirst({
    where: eq(user.id, userId),
    columns: { isAdmin: true }
  });

  if (!isAdmin?.isAdmin) {
    return;
  }

  const organizations = await db.query.organization.findMany();

  for (const organization of organizations) {
    await auth.api.addMember({
      body: {
        userId,
        organizationId: organization.id,
        role: 'admin'
      }
    });
  }
}

/**
 * Add all admins to a new organization.
 * @param organizationId - The ID of the organization to add admins to.
 */
export async function addAllAdminsToNeworganization(organizationId: string) {
  const admins = await db.query.user.findMany({
    where: eq(user.isAdmin, true),
    with: {
      memberships: {
        columns: {
          organizationId: true
        }
      }
    }
  });

  for (const admin of admins) {
    // if the admin is already a member of the organization, skip
    if (
      admin.memberships.some(
        (membership) => membership.organizationId === organizationId
      )
    ) {
      continue;
    }

    await auth.api.addMember({
      body: {
        userId: admin.id,
        organizationId,
        role: 'admin'
      }
    });
  }
}

/**
 * Delete a organization.
 * @param organizationId - The ID of the organization to delete.
 * @returns A success message if the organization is deleted, otherwise an error message.
 */
export async function deleteorganization(organizationId: string) {
  try {
    await auth.api.deleteOrganization({
      body: {
        organizationId
      },
      headers: await headers()
    });

    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
