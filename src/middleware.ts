import { NextRequest, NextResponse } from 'next/server';

import { getSessionCookie } from 'better-auth/cookies';

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // Handle subdomain routing
  if (hostname.startsWith('app.')) {
    // Check authentication for subdomain requests
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
      // Redirect to login page, preserving the subdomain
      const loginUrl = new URL('/auth/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Rewrite app.example.com/* to /app/*
    const url = request.nextUrl.clone();
    url.pathname = `/app${pathname}`;
    return NextResponse.rewrite(url);
  }

  // Handle authentication for direct app routes
  if (pathname.startsWith('/app')) {
    const sessionCookie = getSessionCookie(request);

    // THIS IS NOT SECURE!
    // This is the recommended approach to optimistically redirect users
    // We recommend handling auth checks in each page/route
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/app/:path*',
    // Add matcher for subdomain requests
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};
