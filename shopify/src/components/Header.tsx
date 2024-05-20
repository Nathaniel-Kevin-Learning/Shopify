'use server';
import { getCookie } from '@/actions/getCookies';
import Link from 'next/link';
import { LogoutButton } from './LogoutButton';

export default async function Header() {
  const headers = await getCookie();
  const cookie = headers?.value;
  return (
    <div className="navbar bg-base-100 sticky z-10 w-full">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href={'/'}>Home</Link>
            </li>
            <li>
              <Link href={'/products'}>Product</Link>
            </li>
            <li>
              <Link href={'/'}>Whislist</Link>
            </li>
          </ul>
        </div>
        <div className="hidden lg:flex justify-center align-middle ">
          <Link href={'/'} className="btn btn-ghost text-xl">
            Shopify
          </Link>
          <ul className="menu menu-horizontal px-1 text-center h-full">
            <li>
              <Link href={'/'}>Home</Link>
            </li>
            <li>
              <Link href={'/products'}>Product</Link>
            </li>
            <li>
              <Link href={'/wishlist'}>Whislist</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-end gap-x-4">
        {!cookie ? (
          <>
            <Link href={'/login'} className="btn w-20">
              Login
            </Link>
            <Link href={'/register'} className="btn btn-primary w-20">
              Register
            </Link>
          </>
        ) : (
          <LogoutButton />
        )}
      </div>
    </div>
  );
}
