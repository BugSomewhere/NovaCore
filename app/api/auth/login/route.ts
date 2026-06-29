import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';
import { signToken, setAuthCookie } from '@/lib/auth';
import { loginSchema } from '@/lib/validations/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    // Find user with credentials
    const result = await pool.query(
      `SELECT u.id, u.email, u.full_name, u.avartar, uc.password_hashed
       FROM users u
       JOIN user_credentials uc ON uc.user_id = u.id
       WHERE u.email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: 'Email hoặc mật khẩu không đúng' },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    // Verify password
    const isValid = await bcrypt.compare(password, user.password_hashed);
    if (!isValid) {
      return NextResponse.json(
        { message: 'Email hoặc mật khẩu không đúng' },
        { status: 401 }
      );
    }

    // Get user role
    const roleResult = await pool.query(
      `SELECT r.name FROM user_roles ur
       JOIN roles r ON r.id = ur.role_id
       WHERE ur.user_id = $1
       LIMIT 1`,
      [user.id]
    );
    const role = roleResult.rows[0]?.name ?? 'member';

    // Create JWT and set cookie
    const token = await signToken({
      id: user.id,
      email: user.email,
      role,
    });
    await setAuthCookie(token);

    return NextResponse.json({
      message: 'Đăng nhập thành công',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        avatar: user.avartar,
        role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Lỗi server, vui lòng thử lại' },
      { status: 500 }
    );
  }
}
