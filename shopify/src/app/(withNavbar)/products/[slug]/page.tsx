'use server';

import AddWishListButton2 from '@/components/AddWishlistButton2';
import { ProductData } from '@/interfaces';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;

  const { data }: { data: ProductData } = await fetch(
    process.env.NEXT_PUBLIC_URL_API + `/products/${slug}`,
    {
      cache: 'no-store',
    }
  ).then((res) => res.json());

  return {
    title: `Shopify || ${data.name}`,
    description: data.excerpt,
  };
}

async function fetchData(slug: string): Promise<ProductData> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_URL_API + `/products/${slug}`,
    {
      cache: 'no-store',
    }
  );
  if (!response.ok) {
    const responseError = (await response.json()) as { message: string };
    throw new Error(responseError.message);
  }
  const { data }: { data: ProductData } = await response.json();
  return data;
}

export default async function ProductDetail({ params }: Props) {
  function formatter(price: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
    }).format(price);
  }

  const product = await fetchData(params.slug);

  return (
    <div className=" mx-auto p-4 bg-slate-300 min-h-screen">
      <div className="bg-gray-100 px-14 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center">
          <div>
            <div className="carousel w-full">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  id={`item${index}`}
                  className={`carousel-item w-full `}
                >
                  <img
                    src={image}
                    className="w-full h-96 object-fill"
                    alt="img product detail"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center w-full py-2 gap-2">
              {product.images.map((_, index) => (
                <Link href={`#item${index}`} key={index}>
                  <p className={`btn btn-xs btn-neutral `}>{index + 1}</p>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-lg font-bold text-blue-500 mb-4">
              {formatter(product.price)}
            </p>
            <div className="flex gap-4">
              {product.tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 px-2 py-1 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex mt-5 gap-4 items-center content-center">
              <Link className="btn btn-primary" href={'/products'}>
                Back to Products
              </Link>
              <AddWishListButton2 productId={product._id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
