
import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

const ADMIN_EMAIL = 'admin@tinystory.ai';
// Hash for "TinyTales@2025!Admin#Secure99"
const ADMIN_PASSWORD_HASH = '$2a$10$w/g.p5b2M8J.Lp5Z3Z5J.e.k0o/v.Gz/j/7.x.k9Q/nB/v.k8Q/sS';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (email !== ADMIN_EMAIL) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const passwordsMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

    if (!passwordsMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const session = await encrypt({ 
      user: { email: ADMIN_EMAIL }, 
      role: 'admin',
      expires 
    });

    cookies().set('admin_token', session, { expires, httpOnly: true, path: '/' });

    return NextResponse.json({ success: true, redirect: "/admin/dashboard" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}