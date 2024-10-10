import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const colorMode = cookieStore.get('colorMode')?.value ?? 'system';
  return new Response(JSON.stringify({ colorMode }));
}
