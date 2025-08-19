import './globals.css';
import React from 'react';

export const metadata = {
  title: 'AppBank',
  description: 'Whitelabel Banking Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

