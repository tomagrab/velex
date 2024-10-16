import prisma from '@/lib/db/prisma/prisma';
import { Ticket } from '@prisma/client';
import { CommonResponse } from '@/lib/types/api/common-response/common-response';

// Utility function to create a new ticket for SSR pages
export const PostTicket = async (
  data: Ticket,
): Promise<CommonResponse<Ticket | null>> => {
  try {
    // Create a new ticket
    const newTicket = await prisma.ticket.create({
      data: {
        creatorId: data.creatorId,
        ownerId: data.ownerId,
        lastEditedById: data.lastEditedById,
        assignedId: data.assignedId,
        clientName: data.clientName,
        statusId: data.statusId,
        categoryId: data.categoryId,
        subCategoryId: data.subCategoryId,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
    });

    return { success: true, data: newTicket, error: 'No errors!', status: 201 };
  } catch (error) {
    console.error('Error creating ticket:', error);
    return {
      success: false,
      data: null,
      error: 'Error creating ticket',
      status: 500,
    };
  }
};
