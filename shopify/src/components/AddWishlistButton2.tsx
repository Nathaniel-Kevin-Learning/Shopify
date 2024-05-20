'use client';
import { DataAddToWishlist } from '@/interfaces';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RxHeartFilled } from 'react-icons/rx';
import Swal from 'sweetalert2';

export default function AddWishListButton2({ productId }: DataAddToWishlist) {
  const route = useRouter();
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
        Swal.fire({
          icon: 'success',
          title: 'Success added into wishlist',
          text: 'Success added product into wishlist',
        });
        route.push('/products');
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
      className=" btn flex items-center justify-center bg-pink-200 border border-pink-200 text-black py-2 px-4 rounded-md "
      onClick={() => {
        addWishlistHandler(productId);
      }}
      disabled={loading}
    >
      Add to withslist{' '}
      <RxHeartFilled style={{ marginLeft: '5px', color: 'red' }} size={20} />
    </button>
  );
}
