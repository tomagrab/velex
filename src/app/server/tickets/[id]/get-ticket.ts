import prisma from '@/lib/db/prisma/prisma';
import { Prisma } from '@prisma/client';
import { CommonResponse } from '@/lib/types/api/common-response/common-response';

// Utility function to fetch a single ticket for SSR pages
export const GetTicket = async (
  id: string,
): Promise<
  CommonResponse<Prisma.TicketGetPayload<{
    include: {
      creator: true;
      owner: true;
      status: true;
      category: true;
      subCategory: true;
      notes: true;
    };
  }> | null>
> => {
  try {
    // Fetch the ticket from the database
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
      return {
        success: false,
        data: null,
        error: 'Ticket not found',
        status: 404,
      };
    }

    return {
      success: true,
      data: ticket,
      error: 'No errors!',
      status: 200,
    };
  } catch (error) {
    console.error('Error fetching ticket:', error);
    return {
      success: false,
      data: null,
      error: 'Error fetching ticket',
      status: 500,
    };
  }
};
