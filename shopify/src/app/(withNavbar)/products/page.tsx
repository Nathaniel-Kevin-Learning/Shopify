'use client';
import { useState, useEffect } from 'react';
import { ProductData } from '../../../interfaces';
import Swal from 'sweetalert2';
import Search from '@/components/Search';
import ListProduct from '@/components/ListProduct';

export default function Product() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [reset, setReset] = useState<boolean>(false);


  return (
    <main className="bg-slate-300 min-h-screen">
      <div className="flex flex-col">
        {/* search product */}
        <Search
          setSearchTerm={setSearchTerm}
          setPage={setPage}
          setReset={setReset}
        />
        {/* This is list product */}
        <ListProduct
          searchTerm={searchTerm}
          setPage={setPage}
          page={page}
          reset={reset}
          setReset={setReset}
        />
      </div>
    </main>
  );
}
