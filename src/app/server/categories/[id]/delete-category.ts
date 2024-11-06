import prisma from '@/lib/db/prisma/prisma';
import { CommonResponse } from '@/lib/types/api/common-response/common-response';

// Utility function to delete a category for SSR pages
export const DeleteCategory = async (
  id: string,
): Promise<CommonResponse<null>> => {
  try {
    // Delete the category from the database
    await prisma.ticket.delete({
      where: { id },
    });

    return { success: true, data: null, error: 'No errors!', status: 200 };
  } catch (error) {
    console.error('Error deleting ticket:', error);
    return {
      success: false,
      data: null,
      error: 'Error deleting ticket',
      status: 500,
    };
  }
};
