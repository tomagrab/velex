import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { colorMode } = await request.json();
  cookies().set('colorMode', colorMode, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  }); // 1 year

  return NextResponse.json({ success: true });
}
