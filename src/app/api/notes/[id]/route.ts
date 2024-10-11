import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma/prisma';

export const GET = withApiAuthRequired(
  async (
    request: NextRequest,
    context: { params?: Record<string, string | string[]> },
  ) => {
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

      if (!context.params || !context.params.id) {
        return NextResponse.json(
          { error: 'Invalid request parameters' },
          { status: 400 },
        );
      }

      const id = context.params.id as string;
      const note = await prisma.note.findUnique({
        where: { id },
        include: {
          ticket: true,
          creator: true,
        },
      });

      if (!note) {
        return NextResponse.json({ error: 'Note not found' }, { status: 404 });
      }

      return NextResponse.json(note);
    } catch (error) {
      console.error('Error fetching note:', error);
      return NextResponse.json(
        { error: 'Error fetching note' },
        { status: 500 },
      );
    }
  },
);

export const PUT = withApiAuthRequired(
  async (
    request: NextRequest,
    context: { params?: Record<string, string | string[]> },
  ) => {
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

      if (!context.params || !context.params.id) {
        return NextResponse.json(
          { error: 'Invalid request parameters' },
          { status: 400 },
        );
      }

      const id = context.params.id as string;
      const data = await request.json();

      const updatedNote = await prisma.note.update({
        where: { id },
        data: {
          ...data,
          lastEditedBy: { connect: { id: data.lastEditedById } },
        },
      });

      return NextResponse.json(updatedNote);
    } catch (error) {
      console.error('Error updating note:', error);
      return NextResponse.json(
        { error: 'Error updating note' },
        { status: 500 },
      );
    }
  },
);

export const DELETE = withApiAuthRequired(
  async (
    request: NextRequest,
    context: { params?: Record<string, string | string[]> },
  ) => {
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

      if (!context.params || !context.params.id) {
        return NextResponse.json(
          { error: 'Invalid request parameters' },
          { status: 400 },
        );
      }

      const id = context.params.id as string;
      await prisma.note.delete({
        where: { id },
      });

      return NextResponse.json({ message: 'Note deleted' });
    } catch (error) {
      console.error('Error deleting note:', error);
      return NextResponse.json(
        { error: 'Error deleting note' },
        { status: 500 },
      );
    }
  },
);
