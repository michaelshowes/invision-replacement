'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { organization } from '@/db/schema/auth/_index';
import { auth } from '@/lib/auth';
import { authClient } from '@/lib/auth-client';
import { generateSlug } from '@/utils/generateSlug';

/**
 * Get all organizations.
 * @returns All organizations.
 */
export async function getAllOrganizations() {
  return await db.query.organization.findMany();
}

/**
 * Get an organization by its slug.
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
      projects: true
    }
  });

  if (result === undefined) {
    notFound();
  }

  return result;
}

export async function createOrg(name: string, logo: string) {
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
