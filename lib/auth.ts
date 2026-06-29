import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import type { JwtPayload } from '@/types';

const COOKIE_NAME = 'novacore_token';
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function signToken(payload: JwtPayload): Promise<string> {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .setIssuedAt()
    .sign(secret);
}

export async function verifyToken(token: string): Promise<JwtPayload> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as JwtPayload;
  } catch {
    throw new Error('Invalid token');
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function getCurrentUser(): Promise<JwtPayload> {
  const token = await getAuthToken();
  if (!token) throw new Error('No token found');
  return verifyToken(token);
}

export { COOKIE_NAME };
