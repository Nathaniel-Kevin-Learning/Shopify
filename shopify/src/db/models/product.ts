import { database } from '../config';

export type Product = {
  name: string;
  slug: string;
  description?: string;
  excerpt?: string;
  price?: number;
  tags?: string[];
  thumbnail?: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
};

export type ProductCount = {
  totalCount: number;
};

export const fetchProductList = async (
  searchQuery: string,
  pageQuery: number
) => {
  // const db = await getDb();

  return database
    .collection<Product>('products')
    .aggregate([
      {
        $match: {
          name: {
            $regex: searchQuery,
            $options: 'i',
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: pageQuery,
      },
      {
        $limit: 5,
      },
    ])
    .toArray();
};

export const fetchProductListWithoutSearch = async (pageQuery: number) => {
  // const db = await getDb();

  return database
    .collection<Product>('products')
    .aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: pageQuery,
      },
      {
        $limit: 5,
      },
    ])
    .toArray();
};

export const getTotalData = async (searchQuery: string) => {
  // const db = await getDb();
  return database.collection<ProductCount>('products').countDocuments({
    name: {
      $regex: searchQuery,
      $options: 'i',
    },
  });
};

export const getProductDetail = async (slug: string) => {
  // const db = await getDb();
  return database.collection<Product>('products').findOne({ slug });
};
