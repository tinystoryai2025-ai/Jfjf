
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  cookies().set('admin_token', '', { expires: new Date(0), httpOnly: true, path: '/' });
  return NextResponse.json({ message: 'Logout successful' }, { status: 200 });
}
