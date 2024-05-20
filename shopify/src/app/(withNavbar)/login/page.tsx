'use client';
import Image from 'next/image';
import logo from '../../../assets/Shopify.png';
import Link from 'next/link';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { setCookies } from '@/actions/setCookies';
import { DataToken } from '@/interfaces';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const body = {
      email,
      password,
    };

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_URL_API + '/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
        cache: 'no-store',
      });

      if (!res.ok) {
        const data = (await res.json()) as { message: string };
        throw new Error(data.message);
      } else {
        const data = (await res.json()) as DataToken;
        Swal.fire({
          icon: 'success',
          title: 'User LoggedIn',
          text: 'User has successfully logged in',
        });
        setCookies(data);
        route.push('/');
      }
    } catch (error) {
      if (error instanceof Error && 'message' in error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
        route.push(`/login?error=${error.message}`);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error occurred. Please try again later.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-slate-300 min-h-screen items-center justify-center">
      <section id="logo" className="mx-20">
        <Image src={logo} alt="shopify" />
      </section>
      <section id="login-input" className="w-1/2">
        <div className="max-w-md w-full p-8 bg-gray-100 shadow-lg rounded-md my-5">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Welcome back to shopify!
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="input input-bordered"
                placeholder="Enter your email"
              />
            </div>
            <div className="form-control mb-4">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                className="input input-bordered"
                placeholder="Enter your password"
              />
            </div>
            <div className="form-control mb-4">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex justify-center mt-4">
            <span className="text-gray-600">Don&apos;t have an account?</span>
            <Link
              href={'/register'}
              className="text-blue-600 ml-1 hover:underline"
            >
              Register now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
