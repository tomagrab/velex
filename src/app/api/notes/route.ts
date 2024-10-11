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

    const notes = await prisma.note.findMany({
      include: {
        ticket: true,
        creator: true,
      },
    });

    return NextResponse.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json(
      { error: 'Error fetching notes' },
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

    const newNote = await prisma.note.create({
      data: {
        ...data,
        ticket: { connect: { id: data.ticketId } },
        creator: { connect: { id: data.creatorId } },
      },
    });

    return NextResponse.json(newNote);
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json({ error: 'Error creating note' }, { status: 500 });
  }
});
