'use client';
import ListWishlist from '@/components/ListWishlist';
import { WishListData } from '@/interfaces';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Wishlist() {
  const [dataWishlist, setdataWishlist] = useState<WishListData[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchWishlist(): Promise<void> {
    setLoading(true);
    const res = await fetch(process.env.NEXT_PUBLIC_URL_API + '/wishlist', {
      cache: 'no-store',
    });
    if (!res.ok) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong data can not be fetched!',
      });
      setLoading(false);
      throw null;
    } else {
      const data = await res.json();

      setdataWishlist(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <>
      {loading ? (
        <div
          key="loader"
          className="mx-auto py-6 p-10 bg-gray-300 min-h-screen"
        >
          <div className="flex text-center items-center justify-center w-full min-h-screen">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        </div>
      ) : (
        <div className="mx-auto py-6 p-10 bg-gray-300 min-h-screen">
          <div className="bg-gray-100 p-4">
            {/* Wishlist component */}
            <ListWishlist
              dataWishList={dataWishlist}
              fetchWishlist={fetchWishlist}
            />
          </div>
        </div>
      )}
    </>
  );
}
