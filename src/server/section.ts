'use server';

import { revalidatePath } from 'next/cache';

import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

import { db } from '@/db';
import { section } from '@/db/schema/section';

export async function createSection(organizationId: string, name: string) {
  try {
    const newSection = await db
      .insert(section)
      .values({
        id: uuidv4(),
        name: name || 'New Section',
        organizationId,
        description: '',
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning();

    revalidatePath(`/app/organizations/${organizationId}`);

    return {
      data: newSection[0],
      message: 'Section created successfully'
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      message: 'Failed to create section'
    };
  }
}

export async function getSections(organizationId: string) {
  try {
    const sections = await db
      .select()
      .from(section)
      .where(eq(section.organizationId, organizationId));

    return {
      data: sections,
      message: 'Sections fetched successfully'
    };
  } catch (error) {
    return {
      data: null,
      message: 'Failed to fetch sections'
    };
  }
}

export async function getSectionById(sectionId: string) {
  try {
    const data = await db.query.section.findFirst({
      where: eq(section.id, sectionId),
      with: {
        screens: true
      }
    });

    return {
      data,
      message: 'Section fetched successfully'
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      message: 'Failed to fetch section'
    };
  }
}
