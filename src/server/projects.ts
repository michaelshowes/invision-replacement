'use server';

import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

import { db } from '@/db';
import { projects } from '@/db/schema/projects';

export async function getProjectById(projectId: string) {
  const project = await db.query.projects.findFirst({
    where: eq(projects.id, projectId)
  });

  if (!project) {
    throw new Error('Project not found');
  }

  return project;
}

export async function createProject(organizationSlug: string, name: string) {
  const existingProject = await db.query.projects.findFirst({
    where: eq(projects.name, name)
  });

  if (existingProject) {
    throw new Error('Project already exists');
  }

  try {
    const result = await db
      .insert(projects)
      .values({
        id: uuidv4(),
        name,
        organizationId: organizationSlug
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
