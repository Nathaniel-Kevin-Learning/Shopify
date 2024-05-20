import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCookie } from './actions/getCookies';
import { cookies } from 'next/headers';
import * as jose from 'jose';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/wishlist')) {
    const authorization = cookies().get('authorization');
    if (!authorization) {
      return NextResponse.json(
        {
          message:
            'You must logged in first to use wishlist function in the app',
        },
        { status: 401 }
      );
    }
    let [bearer, token] = authorization.value.split(' ');
    if (bearer != 'Bearer') {
      return NextResponse.json(
        {
          message:
            'You must logged in first to use wishlist function in the app',
        },
        { status: 401 }
      );
    }
    if (!token) {
      return NextResponse.json(
        {
          message:
            'You must logged in first to use wishlist function in the app',
        },
        { status: 401 }
      );
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jose.jwtVerify<{
      _id: string;
      username: string;
      email: string;
    }>(token, secret);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('userId', payload._id);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;
  }

  if (request.nextUrl.pathname.startsWith('/login')) {
    const authorization = cookies().get('authorization');

    if (authorization) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/register')) {
    const authorization = cookies().get('authorization');

    if (authorization) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/wishlist')) {
    const authorization = cookies().get('authorization');

    if (!authorization) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}
