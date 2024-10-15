import prisma from '@/lib/db/prisma/prisma';
import { Ticket } from '@prisma/client';
import { CommonResponse } from '@/lib/types/api/common-response/common-response';

// Utility function to fetch all tickets for SSR pages
export const GetTickets = async (): Promise<CommonResponse<
  Ticket[]
> | null> => {
  try {
    // Fetch tickets from the database
    const tickets = await prisma.ticket.findMany({
      include: {
        creator: true,
        owner: true,
        assignedTo: true,
        lastEditedBy: true,
        status: true,
        category: true,
        subCategory: true,
        notes: true,
      },
    });

    if (!tickets || tickets.length === 0) {
      return {
        success: false,
        data: [],
        error: 'No tickets found',
        status: 404,
      };
    }

    return { success: true, data: tickets, error: 'No errors!', status: 200 };
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return {
      success: false,
      data: [],
      error: 'Error fetching tickets',
      status: 500,
    };
  }
};
