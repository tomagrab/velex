import prisma from '@/lib/db/prisma/prisma';
import { Ticket } from '@prisma/client';
import { CommonResponse } from '@/lib/types/api/common-response/common-response';

// Utility function to update a ticket for SSR pages
export const PutTicket = async (
  id: string,
  data: Ticket,
): Promise<CommonResponse<Ticket | null>> => {
  try {
    // Update the ticket in the database
    const updatedTicket = await prisma.ticket.update({
      where: { id },
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

    return {
      success: true,
      data: updatedTicket,
      error: 'No errors!',
      status: 200,
    };
  } catch (error) {
    console.error('Error updating ticket:', error);
    return {
      success: false,
      data: null,
      error: 'Error updating ticket',
      status: 500,
    };
  }
};
