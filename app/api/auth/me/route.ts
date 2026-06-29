import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import pool from '@/lib/db';

export async function GET() {
  const payload = await getCurrentUser();
  if (!payload) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const result = await pool.query(
    `SELECT u.id, u.email, u.full_name, u.avartar
     FROM users u
     WHERE u.id = $1`,
    [payload.userId]
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const user = result.rows[0];

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      avatar: user.avartar,
      role: payload.role,
    },
  });
}
