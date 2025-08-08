'use client';

import { Button } from '../ui/button';

export default function FigmaControls() {
  return (
    <div>
      <Button>Previous</Button>
      <Button variant={'outline'}>Next</Button>
      <Button variant={'secondary'}>Restart</Button>
    </div>
  );
}
