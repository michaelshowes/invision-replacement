import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getSessionCookie } from 'better-auth/cookies';

// List of public routes that don't require authentication
const publicRoutes = [
  '/auth/login',
  '/auth/sign-up',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/api/accept-invitation',
  '/dashboard'
];

export function middleware(request: NextRequest) {
  // Check if the current path is a public route
  if (
    publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.next();
  }

  // Check for session cookie
  const sessionCookie = getSessionCookie(request);

  // If no session and trying to access protected route, redirect to login
  if (!sessionCookie && !request.nextUrl.pathname.startsWith('/api/auth')) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Configure which routes should be handled by this middleware
export const config = {
  matcher: [
    // Protected routes
    // '/dashboard/:path*',
    // Exclude public assets and api routes
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ]
};
