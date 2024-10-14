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

    const subcategories = await prisma.subCategory.findMany();
    return NextResponse.json(subcategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    return NextResponse.json(
      { error: 'Error fetching subcategories' },
      { status: 500 },
    );
  }
});

export const POST = withApiAuthRequired(
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

      const categoryId = context.params.id as string;

      const data = await request.json();
      const newSubCategory = await prisma.subCategory.create({
        data: { ...data, categoryId: categoryId },
      });
      return NextResponse.json(newSubCategory);
    } catch (error) {
      console.error('Error creating subcategory:', error);
      return NextResponse.json(
        { error: 'Error creating subcategory' },
        { status: 500 },
      );
    }
  },
);
