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
      const category = await prisma.category.findUnique({
        where: { id },
      });

      if (!category) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404 },
        );
      }

      return NextResponse.json(category);
    } catch (error) {
      console.error('Error fetching category:', error);
      return NextResponse.json(
        { error: 'Error fetching category' },
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

      const updatedCategory = await prisma.category.update({
        where: { id },
        data,
      });

      return NextResponse.json(updatedCategory);
    } catch (error) {
      console.error('Error updating category:', error);
      return NextResponse.json(
        { error: 'Error updating category' },
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
      await prisma.category.delete({
        where: { id },
      });

      return NextResponse.json({ message: 'Category deleted' });
    } catch (error) {
      console.error('Error deleting category:', error);
      return NextResponse.json(
        { error: 'Error deleting category' },
        { status: 500 },
      );
    }
  },
);
