import Link from 'next/link';

import CreateProjectBtn from '@/components/CreateProjectBtn';
import { getOrganizationBySlug } from '@/server/organizations';

type Params = Promise<{ slug: string }>;

export default async function ClientPage({ params }: { params: Params }) {
  const { slug } = await params;
  const { projects, ...organization } = await getOrganizationBySlug(slug);

  return (
    <div>
      <h1 className={'text-3xl font-bold'}>{organization.name}</h1>

      <div>
        {projects.map((project) => (
          <div key={project.id}>
            <Link href={`/dashboard/clients/${slug}/project/${project.id}`}>
              {project.name}
            </Link>
          </div>
        ))}
        <div>
          <CreateProjectBtn organizationId={organization.id} />
        </div>
      </div>
    </div>
  );
}
