import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'novacore_token';
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const publicPaths = ['/login', '/register'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow API routes and static files
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.startsWith('/favicon')) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const isPublicPath = publicPaths.some((p) => pathname.startsWith(p));

  if (token) {
    try {
      await jwtVerify(token, secret);
      // Authenticated user trying to access login/register → redirect to home
      if (isPublicPath) {
        return NextResponse.redirect(new URL('/', request.url));
      }
      return NextResponse.next();
    } catch {
      // Invalid token → clear cookie and redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
  }

  // No token
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Protected route → redirect to login
  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
