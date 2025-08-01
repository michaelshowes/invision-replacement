'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className='flex min-h-[400px] flex-col items-center justify-center p-8'>
      <h1 className='mb-4 text-2xl font-bold'>Client Not Found</h1>
      <p className='mb-6 max-w-md text-center'>
        The client you're looking for could not be found.
      </p>
      <Button asChild>
        <Link href='/dashboard'>Back to Dashboard</Link>
      </Button>
    </div>
  );
}
