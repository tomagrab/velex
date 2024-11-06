import prisma from '@/lib/db/prisma/prisma';
import { CommonTicketType } from '@/lib/types/layout/tickets/common-ticket-type/common-ticket-type';

// Utility function to fetch a single ticket for SSR pages
export const GetTicket = async (id: string): Promise<CommonTicketType | null> => {
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
      return null;
    }

    return ticket;
  } catch (error) {
    console.error('Error fetching ticket:', error);
    return null;
  }
};
