import { DataDetailPage, NavigationData, ProductData } from '@/interfaces';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import WishlistButton from './WishlistButton';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';

function formatter(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
  }).format(price);
}

export default function Navigation({
  searchTerm,
  page,
  setPage,
  reset,
  setReset,
}: NavigationData) {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalPage, setTotalPage] = useState<number>(1);

  async function fetchData(): Promise<void> {
    setLoading(true);
    if (reset) {
      setProducts([]);
      setReset(false);
      setHasMore(true);
    }
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL_API +
        `/products?search=${searchTerm}&page=${page}`,
      {
        cache: 'no-store',
      }
    );
    if (!response.ok) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong data can not be fetched!',
      });
      setLoading(false);
      throw null;
    }
    const {
      data,
      detailPage,
    }: { data: ProductData[]; detailPage: DataDetailPage } =
      await response.json();

    setProducts(data);
    setTotalPage(detailPage.totalPage);
    setPage(detailPage.currentPage);
    setLoading(false);
  }

  async function fetchData2(): Promise<void> {
    if (totalPage === page) {
      setHasMore(false);
    } else {
      const nextPage = page + 1;
      const response = await fetch(
        process.env.NEXT_PUBLIC_URL_API +
          `/products?search=${searchTerm}&page=${nextPage}`,
        {
          cache: 'no-store',
        }
      );
      if (!response.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong, data could not be fetched!',
        });
        throw null;
      }
      const {
        data,
        detailPage,
      }: { data: ProductData[]; detailPage: DataDetailPage } =
        await response.json();

      setProducts((prevItems) => [...prevItems, ...data]);

      setTotalPage(detailPage.totalPage);
      setPage(detailPage.currentPage);
    }
  }

  useEffect(() => {
    fetchData();
  }, [searchTerm]);
  return (
    <>
      {/* Product Cards */}
      <div>
        {loading ? (
          <div key="loader">
            <div className="text-center w-full">
              <span className="loading loading-ring loading-lg"></span>
            </div>
          </div>
        ) : products.length !== 0 ? (
          <InfiniteScroll
            dataLength={products.length}
            next={fetchData2}
            hasMore={hasMore}
            loader={
              <div key="loader">
                <div className="text-center w-full">
                  <span className="loading loading-ring loading-lg"></span>
                </div>
              </div>
            }
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>You have seen all of the available product</b>
              </p>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white shadow-md rounded-lg p-4 flex z-0"
                >
                  <div className="w-1/3">
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-full h-48 object-cover mb-2 rounded-lg"
                    />
                  </div>
                  <div className="w-2/3 ml-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      {/* part wishlist nya */}
                      <WishlistButton productId={product._id} />
                    </div>
                    <p
                      className="text-sm text-gray-600 mb-2 h-15"
                      style={{
                        wordWrap: 'break-word',
                        maxHeight: '5rem',
                        overflowY: 'auto',
                      }}
                    >
                      {product.excerpt}
                    </p>
                    <p className="text-lg font-bold text-blue-500 my-5">
                      {formatter(product.price)}
                    </p>
                    <Link
                      href={`/products/${product.slug}`}
                      className="btn btn-primary"
                    >
                      See detail
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <div className="w-full">
            <p className="text-gray-500">No products found.</p>
          </div>
        )}
      </div>
    </>
  );
}
