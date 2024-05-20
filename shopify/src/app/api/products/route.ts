import {
  fetchProductList,
  fetchProductListWithoutSearch,
  getTotalData,
} from '@/db/models/product';
import { Document } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get('search') || '';

    const pageQuery = url.searchParams.get('page');

    const skipValue = (Number(pageQuery) - 1) * 5;
    // getting the data
    let data: Document[];
    if (searchQuery != '') {
      data = await fetchProductList(searchQuery, skipValue);
    } else {
      data = await fetchProductListWithoutSearch(skipValue);
    }

    const totalData = await getTotalData(searchQuery);
    let totalPage: number = Math.ceil(Number(totalData) / 5);
    if (totalPage == 0) {
      totalPage = 1;
    }
    return NextResponse.json({
      data: data,
      detailPage: { totalPage, currentPage: Number(pageQuery) },
    });
  } catch (error) {

    return NextResponse.json(
      { message: 'internal server error' },
      { status: 500 }
    );
  }
};
