'use client';
import { DataListProduct, ProductData } from '@/interfaces';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Link from 'next/link';
import WishlistButton from './WishlistButton';
import Swal from 'sweetalert2';
import Navigation from './Navigation';

export default function ListProduct({
  searchTerm,
  page,
  setPage,
  reset,
  setReset,
}: DataListProduct) {
  return (
    <section className="mx-10 my-10 bg-slate-50 shadow p-3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">List Products</h2>
      </div>
      <div className="border-t-2 border-gray-200 my-3" />
      <Navigation
        searchTerm={searchTerm}
        setPage={setPage}
        page={page}
        reset={reset}
        setReset={setReset}
      />
    </section>
  );
}
