import type { Metadata } from 'next';

import { Toaster } from 'sonner';

import './globals.css';

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
    <html lang='en'>
      <body>
        <Toaster position={'top-center'} />
        {children}
      </body>
    </html>
  );
}
