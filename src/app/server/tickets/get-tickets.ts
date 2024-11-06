import prisma from '@/lib/db/prisma/prisma';
import { CommonTicketType } from '@/lib/types/layout/tickets/common-ticket-type/common-ticket-type';

// Utility function to fetch all tickets for SSR pages
export const GetTickets = async (): Promise<CommonTicketType[] | null> => {
  try {
    // Fetch tickets from the database
    const tickets = await prisma.ticket.findMany({
      include: {
        creator: true,
        owner: true,
        assigned: true,
        lastEditedBy: true,
        status: true,
        category: true,
        subCategory: true,
        notes: true,
      },
    });

    if (!tickets || tickets.length === 0) {
      return null;
    }

    return tickets;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return null;
  }
};
