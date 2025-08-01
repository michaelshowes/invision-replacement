'use server';

import { notFound, redirect } from 'next/navigation';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { organizations } from '@/db/schema/auth/_index';

/**
 * Get all organizations.
 * @returns All organizations.
 */
export async function getAllOrganizations() {
  return await db.query.organizations.findMany();
}

/**
 * Get an organization by its slug.
 * @param slug - The slug of the organization to get.
 * @returns The organization with the given slug.
 * @throws redirect to the not-found page if the organization is not found.
 */
export async function getOrganizationBySlug(slug: string) {
  const result = await db.query.organizations.findFirst({
    where: eq(organizations.slug, slug),
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
