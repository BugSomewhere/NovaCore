import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';
import { signToken, setAuthCookie } from '@/lib/auth';
import { registerSchema } from '@/lib/validations/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, password, fullName } = parsed.data;

    // Check if email already exists
    const existing = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { message: 'Email đã được sử dụng' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHashed = await bcrypt.hash(password, 12);

    // Insert user
    const userResult = await pool.query(
      `INSERT INTO users (email, full_name, created_at)
       VALUES ($1, $2, NOW())
       RETURNING id, email, full_name`,
      [email, fullName]
    );
    const user = userResult.rows[0];

    // Insert credentials
    await pool.query(
      `INSERT INTO user_credentials (user_id, password_hashed, modified_at)
       VALUES ($1, $2, NOW())`,
      [user.id, passwordHashed]
    );

    // Assign default role (member)
    const roleResult = await pool.query(
      `SELECT id FROM roles WHERE name = 'member' LIMIT 1`
    );
    if (roleResult.rows.length > 0) {
      await pool.query(
        `INSERT INTO user_roles (user_id, role_id, assigned_at)
         VALUES ($1, $2, NOW())`,
        [user.id, roleResult.rows[0].id]
      );
    }

    // Create JWT and set cookie
    const token = await signToken({
      id: user.id,
      email: user.email,
      role: 'member',
    });
    await setAuthCookie(token);

    return NextResponse.json({
      message: 'Đăng ký thành công',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: 'member',
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { message: 'Lỗi server, vui lòng thử lại' },
      { status: 500 }
    );
  }
}
