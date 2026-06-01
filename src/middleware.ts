import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME, verifySessionToken } from '@/lib/admin-auth';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /admin/login es público (es la puerta de entrada)
  if (pathname === '/admin/login') return NextResponse.next();

  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const ok = await verifySessionToken(token);
  if (ok) return NextResponse.next();

  // Sin sesión válida: redirige a login conservando el destino original
  const url = req.nextUrl.clone();
  url.pathname = '/admin/login';
  url.searchParams.set('next', pathname);
  return NextResponse.redirect(url);
}

export const config = {
  // Solo intercepta rutas /admin/*
  matcher: ['/admin/:path*'],
};
