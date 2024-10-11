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
      const status = await prisma.status.findUnique({
        where: { id },
      });

      if (!status) {
        return NextResponse.json(
          { error: 'Status not found' },
          { status: 404 },
        );
      }

      return NextResponse.json(status);
    } catch (error) {
      console.error('Error fetching status:', error);
      return NextResponse.json(
        { error: 'Error fetching status' },
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

      const updatedStatus = await prisma.status.update({
        where: { id },
        data,
      });

      return NextResponse.json(updatedStatus);
    } catch (error) {
      console.error('Error updating status:', error);
      return NextResponse.json(
        { error: 'Error updating status' },
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
      await prisma.status.delete({
        where: { id },
      });

      return NextResponse.json({ message: 'Status deleted' });
    } catch (error) {
      console.error('Error deleting status:', error);
      return NextResponse.json(
        { error: 'Error deleting status' },
        { status: 500 },
      );
    }
  },
);
