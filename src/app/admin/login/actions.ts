'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  ADMIN_USERNAME,
  SESSION_COOKIE_NAME,
  SESSION_DURATION_MS,
  createSessionToken,
  credentialsMatch,
} from '@/lib/admin-auth';

export type LoginState = { error?: string } | undefined;

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get('username') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const nextRaw = String(formData.get('next') ?? '/admin/upload');

  if (!credentialsMatch(username, password)) {
    return { error: 'Usuario o contraseña incorrectos.' };
  }

  const token = await createSessionToken(ADMIN_USERNAME);
  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: Math.floor(SESSION_DURATION_MS / 1000),
    path: '/',
  });

  // Solo permitimos redirección a paths internos /admin/*
  const next = nextRaw.startsWith('/admin') ? nextRaw : '/admin/upload';
  redirect(next);
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(SESSION_COOKIE_NAME);
  redirect('/admin/login');
}
