'use server';

import { revalidatePath } from 'next/cache';

import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

import { db } from '@/db';
import { screen } from '@/db/schema/screen';

export async function createScreen(sectionId: string, name: string) {
  try {
    const newScreen = await db
      .insert(screen)
      .values({
        id: uuidv4(),
        name: name || 'New Screen',
        sectionId,
        description: '',
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning();

    revalidatePath(`/app/organizations`);

    return {
      data: newScreen[0],
      message: 'Screen created successfully'
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      message: 'Failed to create screen'
    };
  }
}

export async function getScreens(sectionId: string) {
  try {
    const screens = await db
      .select()
      .from(screen)
      .where(eq(screen.sectionId, sectionId));

    return {
      data: screens,
      message: 'Screens fetched successfully'
    };
  } catch (error) {
    return {
      data: null,
      message: 'Failed to fetch screens'
    };
  }
}

export async function getScreenById(screenId: string) {
  try {
    const data = await db.query.screen.findFirst({
      where: eq(screen.id, screenId)
    });

    return {
      data,
      message: 'Screen fetched successfully'
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      message: 'Failed to fetch screen'
    };
  }
}
