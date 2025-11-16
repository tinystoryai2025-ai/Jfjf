
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/auth';

export async function GET() {
  const cookie = cookies().get('admin_token')?.value;

  if (!cookie) {
    return NextResponse.json({ isLoggedIn: false, session: null }, { status: 200 });
  }

  try {
    const session = await decrypt(cookie);
    if (session && session.role === 'admin') {
      return NextResponse.json({ isLoggedIn: true, session }, { status: 200 });
    }
    return NextResponse.json({ isLoggedIn: false, session: null }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ isLoggedIn: false, session: null }, { status: 500 });
  }
}
