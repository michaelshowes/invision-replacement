import Link from 'next/link';

import FigmaCanvas from '@/components/figma/FigmaCanvas';
import CreateScreen from '@/components/section/CreateScreen';
import { Button } from '@/components/ui/button';
import { getSectionById } from '@/server/section';

interface Params {
  sectionId: string;
}

export default async function SectionPage({
  params
}: {
  params: Promise<Params>;
}) {
  const { sectionId } = await params;

  const section = await getSectionById(sectionId);

  return (
    <>
      <h1>{section.data?.name}</h1>
      <CreateScreen sectionId={sectionId} />
      {section.data?.screens.map((screen) => (
        <Link
          key={screen.id}
          href={`/app/organizations/${section.data?.organizationId}/${sectionId}/${screen.id}`}
        >
          {screen.name}
        </Link>
      ))}
      <div className={'h-full w-full'}>
        <FigmaCanvas />
      </div>
    </>
  );
}
