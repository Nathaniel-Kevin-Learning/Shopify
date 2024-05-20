// ! version 2
import { RxHeart } from 'react-icons/rx';
import { DataAddToWishlist } from '../interfaces/index';
import Swal from 'sweetalert2';
import { useState } from 'react';

export default function WishlistButton({ productId }: DataAddToWishlist) {
  const [loading, setLoading] = useState(false);

  const addWishlistHandler = async (productId: string) => {
    setLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_URL_API + '/wishlist', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          productId,
        }),
        cache: 'no-store',
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      } else {
        const data = await res.json();
        Swal.fire({
          icon: 'success',
          title: 'Success added into wishlist',
          text: 'Success added product into wishlist',
        });
      }
    } catch (error) {
      if (error instanceof Error && 'message' in error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error occurred. Please try again later.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="text-red-500 focus:outline-none hover:text-red-800"
      onClick={() => {
        addWishlistHandler(productId);
      }}
      disabled={loading}
    >
      <RxHeart size={40} />
    </button>
  );
}
