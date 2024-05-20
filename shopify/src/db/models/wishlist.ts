import { ObjectId } from 'mongodb';
// import { getMongoDbInstance } from '../config';
import { Twishlist } from '@/validators/wishlist.validator';
import { database } from '../config';

export type Wishlist = {
  userId: ObjectId;
  productId: ObjectId;
  createdAt?: string;
  updatedAt?: string;
};

export const getWishlistById = async (wishlistId: string | ObjectId) => {
  // const db = await getDb();
  const idWishlist =
    typeof wishlistId === 'string' ? new ObjectId(wishlistId) : wishlistId;

  return database.collection<Wishlist>('wishlist').findOne({ _id: idWishlist });
};

export const addWishList = async (wishlistData: Twishlist) => {
  // const db = await getDb();

  let insertData = await database.collection<Wishlist>('wishlist').insertOne({
    productId: new ObjectId(wishlistData.productId),
    userId: new ObjectId(wishlistData.userId),
    createdAt: wishlistData.createdAt,
    updatedAt: wishlistData.updatedAt,
  });
  const wishlistId = insertData.insertedId;

  const dataWishlist = await getWishlistById(wishlistId);

  return dataWishlist;
};

export const getWishListProduct = async (userId: string) => {
  // const db = await getDb();
  const wishlist = database
    .collection<Wishlist>('wishlist')
    .aggregate([
      {
        $match: { userId: new ObjectId(userId) },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'product',
        },
      },
      {
        $unwind: '$product',
      },
    ])
    .toArray();

  return wishlist;
};

export const getWishList = async (userId: string) => {
  // const db = await getDb();
  return database
    .collection<Wishlist>('wishlist')
    .find({ userId: new ObjectId(userId) })
    .toArray();
};

export const deleteWishList = async (wishlistId: string) => {
  // const db = await getDb();
  return database.collection('wishlist').deleteOne({
    _id: new ObjectId(wishlistId),
  });
};
