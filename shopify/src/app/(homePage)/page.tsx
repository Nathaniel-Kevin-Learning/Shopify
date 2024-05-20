import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DetailEcommerce from '@/components/DetailEcommerce';
import Banner from '@/components/Banner';

import { ProductData } from '../../interfaces';
import FeaturedProduct from '@/components/FeaturedProduct';

async function fetchData(): Promise<ProductData[]> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_URL_API + '/products?search=&page=1',
    {
      cache: 'no-store',
    }
  );
  if (!response.ok) {
    throw new Error('fetch data failed test');
  }
  const { data }: { data: ProductData[] } = await response.json();
  return data;
}

export default async function Home() {
  const featuredProducts = await fetchData();

  return (
    <div className="bg-gray-100 min-w-screen">
      {/* Header */}
      <Header />
      <div className=" ">
        <Banner />
        <FeaturedProduct products={featuredProducts} />
        <DetailEcommerce />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
