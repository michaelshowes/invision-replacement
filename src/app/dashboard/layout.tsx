import type { Metadata } from 'next';

import Header from '@/components/shared/Header';

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
    <div>
      <Header />
      {children}
    </div>
  );
}
