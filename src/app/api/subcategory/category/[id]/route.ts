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

      const categoryId = context.params.id as string;

      // Get the subcategory by the categoryId
      const subcategory = await prisma.subCategory.findMany({
        where: { categoryId: categoryId },
      });

      if (!subcategory) {
        return NextResponse.json(
          { error: 'Subcategory not found' },
          { status: 404 },
        );
      }

      return NextResponse.json(subcategory);
    } catch (error) {
      console.error('Error fetching subcategory:', error);
      return NextResponse.json(
        { error: 'Error fetching subcategory' },
        { status: 500 },
      );
    }
  },
);
