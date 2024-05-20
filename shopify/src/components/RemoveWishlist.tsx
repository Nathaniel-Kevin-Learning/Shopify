'use client';
import { DataDeleteWishlist } from '@/interfaces';
import { FaDeleteLeft } from 'react-icons/fa6';
import { useState } from 'react';
import Swal from 'sweetalert2';
export default function RemoveWishlist({
  wishlistId,
  fetchWishlist,
}: DataDeleteWishlist) {
  const [loading, setLoading] = useState(false);

  async function deleteWishlist(wishlistId: string) {
    setLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_URL_API + '/wishlist', {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          wishlistId,
        }),
        cache: 'no-store',
      });
      if (!res.ok) {
        throw new Error('Something went wrong when deleting');
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success delete product from wishlist',
          text: 'product has been successfully deleted from the wishlist',
        });
        fetchWishlist();
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
  }

  return (
    <button
      onClick={() => {
        deleteWishlist(wishlistId);
      }}
      disabled={loading}
    >
      <FaDeleteLeft size={28} />
    </button>
  );
}
