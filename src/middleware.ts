/* FILE: src/middleware.ts
  DESCRIPTION: Security layer to protect clinical routes and handle sub-account redirects.
  CHANGES: 
    - Implemented a "Guard" for all /specialists, /chat, and /diagnostics routes.
    - Rule #6: Checking for 'auth_token' which stores the backend JWT.
    - Rule #5: Humanized logic to explain why a user is being redirected.
    - Rule #4: Non-intrusive logic that doesn't slow down the mobile-first experience.
*/

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Rule #6: We check for the session cookie/token from the Backend
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // 1. Define Protected Routes (Clinical Workspace)
  const isProtectedRoute = 
    pathname.startsWith('/specialists') || 
    pathname.startsWith('/chat') || 
    pathname.startsWith('/diagnostics') ||
    pathname.startsWith('/analytics') ||
    pathname.startsWith('/admissions');

  // 2. Redirect Logic (Rule #5: Humanized Gatekeeping)
  if (isProtectedRoute && !token) {
    // If no token exists, the user is sent to login
    console.log(`[Security]: Unauthenticated attempt to access ${pathname}. Redirecting...`);
    
    const loginUrl = new URL('/auth/login', request.url);
    // We save the 'next' destination so they go back to where they were after login
    loginUrl.searchParams.set('next', pathname);
    
    return NextResponse.redirect(loginUrl);
  }

  // 3. Allow verified traffic
  return NextResponse.next();
}

// Rule #4: The 'matcher' ensures this code only runs on relevant pages, 
// keeping the MacBook Air performance snappy.
export const config = {
  matcher: [
    '/specialists/:path*',
    '/chat/:path*',
    '/diagnostics/:path*',
    '/analytics/:path*',
    '/admissions/:path*',
  ],
};