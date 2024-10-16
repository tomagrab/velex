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
      const ticket = await prisma.ticket.findUnique({
        where: { id },
        include: {
          creator: true,
          owner: true,
          status: true,
          category: true,
          subCategory: true,
          notes: true,
        },
      });

      if (!ticket) {
        return NextResponse.json(
          { error: 'Ticket not found' },
          { status: 404 },
        );
      }

      return NextResponse.json(ticket);
    } catch (error) {
      console.error('Error fetching ticket:', error);
      return NextResponse.json(
        { error: 'Error fetching ticket' },
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

      const updatedTicket = await prisma.ticket.update({
        where: { id },
        data: {
          ...data,
          creator: { connect: { id: data.creatorId } },
          owner: { connect: { id: data.ownerId } },
          status: { connect: { id: data.statusId } },
          category: { connect: { id: data.categoryId } },
          subCategory: { connect: { id: data.subCategoryId } },
        },
      });

      return NextResponse.json(updatedTicket);
    } catch (error) {
      console.error('Error updating ticket:', error);
      return NextResponse.json(
        { error: 'Error updating ticket' },
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
      await prisma.ticket.delete({
        where: { id },
      });

      return NextResponse.json({ message: 'Ticket deleted' });
    } catch (error) {
      console.error('Error deleting ticket:', error);
      return NextResponse.json(
        { error: 'Error deleting ticket' },
        { status: 500 },
      );
    }
  },
);
