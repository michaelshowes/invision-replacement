'use client';

import { Button } from '@/components/ui/button';
import { createSection } from '@/server/section';

export default function CreateSection({
  organizationId,
  name
}: {
  organizationId: string;
  name: string;
}) {
  return (
    <Button onClick={() => createSection(organizationId, name)}>
      Create Section
    </Button>
  );
}
