'use client';

import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const route = useRouter();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 bg-white shadow-md rounded-md text-center">
        <h2 className="text-xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-red-500 mb-4">{error.message}</p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => reset()}
        >
          Try again
        </button>
        <p className="bold">OR</p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            route.push('/products');
          }}
        >
          Go back to product page?
        </button>
      </div>
    </div>
  );
}
