import { NextRequest, NextResponse } from 'next/server';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import prisma from '@/lib/db/prisma/prisma';
import { subMonths } from 'date-fns';

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

      // Raw SQL query to group tickets by month
      const ticketsPerMonth = await prisma.$queryRaw<
        Array<{ month: string; count: bigint }>
      >`
        SELECT TO_CHAR("createdAt", 'Month') AS month, COUNT(*) as count
        FROM "Ticket"
        WHERE "createdAt" >= ${subMonths(new Date(), 6)}
        GROUP BY month
        ORDER BY MIN("createdAt");
      `;

      // Map the result to the desired format and convert BigInt to Number
      const data = ticketsPerMonth.map(row => ({
        key: row.month.trim(), // Month name
        value: Number(row.count), // Ticket count as number
      }));

      return NextResponse.json(data);
    } catch (error) {
      console.error('Error fetching total tickets per month:', error);
      return NextResponse.json(
        { error: 'Error fetching total tickets per month' },
        { status: 500 },
      );
    }
  },
);
