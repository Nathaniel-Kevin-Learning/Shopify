import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Inter } from 'next/font/google';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="min-w-full">{children}</div>
      <Footer />
    </>
  );
}
