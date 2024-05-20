'use server';
import Link from 'next/link';

export default async function DetailEcommerce() {
  return (
    <>
      <div className="mx-10 my-6">
        <div className="bg-blue-100 border border-blue-200 rounded-lg p-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-blue-900 mb-2">
              Welcome to Shopify
            </h2>
          </div>
          <p className="text-lg text-blue-800 mb-4">
            Shopify is your destination for all things e-commerce. Whether
            you&apos;re a seasoned entrepreneur or just starting out, we offer a
            wide range of products and services to help you build, grow, and
            manage your online business.
          </p>
          <p className="text-base text-blue-700 mb-4">
            Explore our curated selection of products and discover the best
            deals on everything from electronics and fashion to home goods and
            more. Start your journey with Shopify today!
          </p>
          <div className="text-center">
            <Link
              href={'/products'}
              className="rounded-md py-2 px-6 btn btn-primary"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
