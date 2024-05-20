import {
  addWishList,
  deleteWishList,
  getWishList,
  getWishListProduct,
  getWishlistById,
} from '@/db/models/wishlist';
import { wishListSchema } from '@/validators/wishlist.validator';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export type dataWishlist = {
  params: {
    productId: string;
  };
};

export const POST = async (request: NextRequest) => {
  try {
    const headerList = headers();
    const userId = headerList.get('userId');
    const body = await request.json();
    const productId = body.productId;

    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const roughData = {
      userId,
      productId,
      createdAt,
      updatedAt,
    };
    // tambah validasi tidak null kalau gak akan ada error menyatakan tidak boleh null dalam string
    if (userId === null) {
      return NextResponse.json(
        { message: 'User ID not found in headers' },
        { status: 400 }
      );
    }
    //perlu nambah validasi kalau entar udah ada get wishlist
    const data = wishListSchema.parse(roughData);
    const checkData = await getWishList(userId);
    let checker: boolean = false;
    checkData.forEach((el) => {
      if (el.productId.toString() === productId) {
        checker = true;
      }
    });
    if (checker) {
      return NextResponse.json(
        {
          message: 'product is already in wishlist',
        },
        { status: 403 }
      );
    }
    const result = await addWishList(data);

    return NextResponse.json(
      {
        result,
        message: 'Product has been successfully added into wishlist',
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }
  }
};

export const GET = async (request: NextRequest) => {
  try {
    // Still hardcode now later don't need to hardcode use the cookie auth
    // const userId = '663af3a205b878228d9ced17';
    const headerList = headers();
    const userId = headerList.get('userId');
    if (userId === null) {
      return NextResponse.json(
        { message: 'User ID not found in headers' },
        { status: 400 }
      );
    }
    let data = await getWishListProduct(userId);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const body = (await request.json()) as { wishlistId: string };
    const wishlistId = body.wishlistId;
    const checkWishlist = await getWishlistById(wishlistId);
    if (!checkWishlist) {
      return NextResponse.json(
        { message: 'Wishlist not found' },
        { status: 404 }
      );
    }

    await deleteWishList(wishlistId);
    return NextResponse.json(
      { message: 'Wishlist has been deleted' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};
