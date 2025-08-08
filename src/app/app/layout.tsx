import type { Metadata } from 'next';

import Header from '@/components/shared/Header';
import Sidebar from '@/components/shared/Sidebar/Sidebar';

export const metadata: Metadata = {
  title: 'Invision Replacement',
  description: 'Invision Replacement'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={'flex h-full w-full'}>
      <Sidebar />
      <div className={'w-full'}>
        <Header />
        {children}
      </div>
    </div>
  );
}
