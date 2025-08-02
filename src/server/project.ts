'use server';

import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

import { db } from '@/db';
import { project } from '@/db/schema/auth/_index';

export async function getProjectById(projectId: string) {
  const projectRecord = await db.query.project.findFirst({
    where: eq(project.id, projectId)
  });

  if (!projectRecord) {
    throw new Error('Project not found');
  }

  return projectRecord;
}

export async function createProject(organizationSlug: string, name: string) {
  const existingProject = await db.query.project.findFirst({
    where: eq(project.name, name)
  });

  if (existingProject) {
    throw new Error('Project already exists');
  }

  try {
    const result = await db
      .insert(project)
      .values({
        id: uuidv4(),
        name,
        organizationId: organizationSlug,
        createdAt: new Date()
      })
      .returning();

    return {
      success: true,
      data: result[0]
    };
  } catch (error) {
    return {
      success: false,
      message: error
    };
  }
}
