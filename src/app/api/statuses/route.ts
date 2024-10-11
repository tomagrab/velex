import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma/prisma';

export const GET = withApiAuthRequired(async (request: NextRequest) => {
  try {
    const response = new NextResponse();
    const session = await getSession(request, response);
    const user = session?.user;

    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const statuses = await prisma.status.findMany();
    return NextResponse.json(statuses);
  } catch (error) {
    console.error('Error fetching statuses:', error);
    return NextResponse.json(
      { error: 'Error fetching statuses' },
      { status: 500 },
    );
  }
});

export const POST = withApiAuthRequired(async (request: NextRequest) => {
  try {
    const response = new NextResponse();
    const session = await getSession(request, response);
    const user = session?.user;

    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await request.json();
    const newStatus = await prisma.status.create({ data });
    return NextResponse.json(newStatus);
  } catch (error) {
    console.error('Error creating status:', error);
    return NextResponse.json(
      { error: 'Error creating status' },
      { status: 500 },
    );
  }
});
