import { NextRequest, NextResponse } from 'next/server';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import prisma from '@/lib/db/prisma/prisma';

export const GET = withApiAuthRequired(
  async (request: NextRequest): Promise<NextResponse> => {
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

      const ticketsByCategory = await prisma.$queryRaw<
        Array<{ categoryName: string; count: bigint }>
      >`
        SELECT c."name" AS "categoryName", COUNT(t."id") AS count
        FROM "Ticket" t
        JOIN "Category" c ON t."categoryId" = c."id"
        GROUP BY c."name"
        ORDER BY c."name";
      `;

      const data = ticketsByCategory.map(row => ({
        key: row.categoryName,
        value: Number(row.count),
      }));

      return NextResponse.json(data);
    } catch (error) {
      console.error('Error fetching total tickets by category:', error);
      return NextResponse.json(
        { error: 'Error fetching total tickets by category' },
        { status: 500 },
      );
    }
  },
);
