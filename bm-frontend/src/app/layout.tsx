import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BMCar AI',
  description: 'Assistente inteligente para recomendação de veículos BMW',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT">
      <body>{children}</body>
    </html>
  );
}