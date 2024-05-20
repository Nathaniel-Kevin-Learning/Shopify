import { WishListData } from '@/interfaces';
import RemoveWishlist from './RemoveWishlist';
import Link from 'next/link';

export default function ListWishlist({
  dataWishList,
  fetchWishlist,
}: {
  dataWishList: WishListData[];
  fetchWishlist: () => Promise<void>;
}) {
  function formatter(price: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
    }).format(price);
  }

  return (
    <>
      <h1 className="text-3xl font-semibold mb-4">Wishlist</h1>
      <hr className="my-4 border-b-2 border-gray-300" />
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {dataWishList.map((wishlist) => (
          <div
            key={wishlist.product._id}
            className="bg-white shadow-md rounded-lg p-4 flex my-2"
          >
            <div className="w-1/3">
              <img
                src={wishlist.product.thumbnail}
                alt={wishlist.product.name}
                className="w-full h-60 object-fit mb-2 rounded-lg"
              />
            </div>
            <div className="w-2/3 ml-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold mb-2">
                  {wishlist.product.name}
                </h3>
                <div className="hover:text-red-500">
                  <RemoveWishlist
                    wishlistId={wishlist._id}
                    fetchWishlist={fetchWishlist}
                  />
                </div>
              </div>
              <p
                className="text-sm text-gray-600 mb-2 h-20 overflow-hidden"
                style={{ textOverflow: 'ellipsis' }}
              >
                {wishlist.product.description}
              </p>
              <p className="text-lg font-bold text-blue-500">
                {formatter(wishlist.product.price)}
              </p>
              <div className="flex">
                <Link
                  href={`/products/${wishlist.product.slug}`}
                  className="btn btn-primary w-32 mt-10"
                >
                  See detail
                </Link>
              </div>
            </div>
          </div>
        ))}
        {dataWishList.length === 0 && (
          <div className="w-full text-gray-500">No products found.</div>
        )}
      </div>
    </>
  );
}
