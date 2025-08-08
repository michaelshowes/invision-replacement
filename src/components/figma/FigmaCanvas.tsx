'use client';

import { useMounted } from '@/hooks/useMounted';

import { Button } from '../ui/button';

export default function FigmaCanvas() {
  const mounted = useMounted();
  if (!mounted) return null;

  const figmaOrigin = 'https://www.figma.com';
  const canvas = document.querySelector('#figma-canvas');

  function previousPage() {
    canvas?.contentWindow?.postMessage(
      {
        type: 'NAVIGATE_BACKWARD'
      },
      figmaOrigin
    );
  }

  function nextPage() {
    canvas?.contentWindow?.postMessage(
      {
        type: 'NAVIGATE_FORWARD'
      },
      figmaOrigin
    );
  }

  function restart() {
    canvas?.contentWindow?.postMessage(
      {
        type: 'RESTART'
      },
      figmaOrigin
    );
  }

  return (
    <>
      <div>
        <Button onClick={previousPage}>Previous</Button>
        <Button
          variant={'outline'}
          onClick={nextPage}
        >
          Next
        </Button>
        <Button
          variant={'secondary'}
          onClick={restart}
        >
          Restart
        </Button>
      </div>
      <iframe
        id='figma-canvas'
        className={'h-full w-full'}
        src='https://embed.figma.com/proto/KubzfHdn9xJjJkEVDiTeUO/Therapy-X---Therapist-Figma-Template--Community-?page-id=937%3A14121&node-id=6272-5937&m=dev&scaling=min-zoom&content-scaling=fixed&embed-host=localhost&client-id=CHywCVtttFp1oj6oVjGlbd'
        allowFullScreen
      />
    </>
  );
}
