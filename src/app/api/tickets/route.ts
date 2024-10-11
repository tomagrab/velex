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

    const tickets = await prisma.ticket.findMany({
      include: {
        creator: true,
        owner: true,
        status: true,
        category: true,
        subCategory: true,
        notes: true,
      },
    });

    return NextResponse.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json(
      { error: 'Error fetching tickets' },
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

    const newTicket = await prisma.ticket.create({
      data: {
        ...data,
        creator: { connect: { id: data.creatorId } },
        owner: { connect: { id: data.ownerId } },
        status: { connect: { id: data.statusId } },
        category: { connect: { id: data.categoryId } },
        subCategory: { connect: { id: data.subCategoryId } },
      },
    });

    return NextResponse.json(newTicket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json(
      { error: 'Error creating ticket' },
      { status: 500 },
    );
  }
});
