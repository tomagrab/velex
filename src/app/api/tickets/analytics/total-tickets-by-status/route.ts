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

      const ticketsByStatus = await prisma.$queryRaw<
        Array<{ statusName: string; count: bigint }>
      >`
        SELECT s."name" AS "statusName", COUNT(t."id") AS count
        FROM "Ticket" t
        JOIN "Status" s ON t."statusId" = s."id"
        GROUP BY s."name"
        ORDER BY s."name";
      `;

      const data = ticketsByStatus.map(row => ({
        key: row.statusName,
        value: Number(row.count),
      }));

      return NextResponse.json(data);
    } catch (error) {
      console.error('Error fetching total tickets by status:', error);
      return NextResponse.json(
        { error: 'Error fetching total tickets by status' },
        { status: 500 },
      );
    }
  },
);
