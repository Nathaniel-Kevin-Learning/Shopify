import { Dispatch, SetStateAction } from 'react';
import ListProduct from '../components/ListProduct';

export interface ProductData {
  _id: string;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DataToken {
  access_token: string;
}

export interface WishListData {
  _id: string;
  productId: string;
  userId: string;
  updatedAt: string;
  createdAt: string;
  product: ProductData;
}
export interface DataUser {
  _id: string;
  name: string;
  username: string;
  email: string;
}
export interface DataRegister {
  userData: DataUser;
  message: string;
}
export interface DataMessage {
  message: string;
}

export interface DataDetailPage {
  totalPage: number;
  currentPage: number;
}

export interface DataAddToWishlist {
  productId: string;
}

export interface DataDeleteWishlist {
  wishlistId: string;
  fetchWishlist: () => Promise<void>;
}

export interface DataSearch {
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
  setReset: Dispatch<SetStateAction<boolean>>;
}

export interface NavigationData{
  searchTerm: string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  reset: boolean;
  setReset: Dispatch<SetStateAction<boolean>>;
}

export interface DataListProduct{
  searchTerm: string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  reset: boolean;
  setReset: Dispatch<SetStateAction<boolean>>;
}

export interface DataLogin{
  email:string;
  password: string;
}