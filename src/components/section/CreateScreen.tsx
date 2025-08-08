'use client';

import { Button } from '@/components/ui/button';
import { createScreen } from '@/server/screen';

export default function CreateScreen({ sectionId }: { sectionId: string }) {
  return (
    <Button onClick={() => createScreen(sectionId, 'New Screen')}>
      Create Screen
    </Button>
  );
}
