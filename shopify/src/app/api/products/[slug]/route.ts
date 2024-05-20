import { getProductDetail } from '@/db/models/product';
export type SlugProduct = {
  params: {
    slug: string;
  };
};

export const GET = async (_request: Request, { params }: SlugProduct) => {
  const product = await getProductDetail(params.slug);
  if (!product) {
    return Response.json({ message: 'no product found' }, { status: 404 });
  }

  return Response.json({ data: product });
};
