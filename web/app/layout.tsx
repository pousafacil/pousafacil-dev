import './globals.css';
import React from 'react';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'AppBank',
  description: 'Whitelabel Banking Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

