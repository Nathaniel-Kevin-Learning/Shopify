import Banner from '@/components/Banner';
import DetailEcommerce from '@/components/DetailEcommerce';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';

export default function loading() {
  return (
    <div className="bg-gray-100 ">
      <main className="container ">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-dots loading-lg"></span>
        </div>
        <Footer />
      </main>
    </div>
  );
}
