import Link from 'next/link';

import { getProjectById } from '@/server/projects';

type Params = Promise<{ projectId: string }>;

export default async function ProjectPage({ params }: { params: Params }) {
  const { projectId } = await params;

  const project = await getProjectById(projectId);

  return (
    <div>
      <h1 className={'text-3xl font-bold'}>{project.name}</h1>
    </div>
  );
}
