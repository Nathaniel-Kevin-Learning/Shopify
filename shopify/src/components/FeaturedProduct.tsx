import { ProductData } from '@/interfaces';
import Link from 'next/link';
import AddWishListButton2 from './AddWishlistButton2';

export default function FeaturedProduct({
  products,
}: {
  products: ProductData[];
}) {
  function formatter(price: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
    }).format(price);
  }
  return (
    <section className="mx-10 my-10 bg-slate-50 shadow p-3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Featured Products</h2>
        <div>
          <Link href={'/products'} className="text-blue-500 hover:underline">
            See All
          </Link>
        </div>
      </div>
      <div className="border-t-2 border-gray-200 my-3" />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Product Cards */}
        {products.length != 0 ? (
          products.map((product) => (
            <Link
              href={`/products/${product.slug}`}
              key={product.slug}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full h-40 object-cover mb-2 rounded-lg"
              />
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p
                className="text-sm text-gray-600 mb-2 h-20"
                style={{
                  wordWrap: 'break-word',
                  maxHeight: '5rem',
                  overflowY: 'auto',
                }}
              >
                {product.excerpt}
              </p>
              <p className="text-lg font-bold text-blue-500">
                {formatter(product.price)}
              </p>
              {/* <AddWishListButton2 /> */}
            </Link>
          ))
        ) : (
          <>
            <div className="flex flex-col gap-4 w-52 p-4">
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
            <div className="flex flex-col gap-4 w-52 mx-4 p-4">
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
            <div className="flex flex-col gap-4 w-52 mx-4 p-4">
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
            <div className="flex flex-col gap-4 w-52 mx-4 p-4">
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
            <div className="flex flex-col gap-4 w-52 mx-4 p-4">
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
