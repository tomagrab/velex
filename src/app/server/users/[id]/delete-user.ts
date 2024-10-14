import prisma from '@/lib/db/prisma/prisma';
import { CommonResponse } from '@/lib/types/api/common-response/common-response';

// Utility function to delete a user for SSR pages
export const DeleteUser = async (id: string): Promise<CommonResponse<null>> => {
  try {
    // Delete the user from the database
    await prisma.user.delete({
      where: { id },
    });

    return { success: true, status: 200, data: null };
  } catch (error) {
    console.error('Error deleting user for SSR:', error);
    return {
      success: false,
      data: null,
      error: 'Error deleting user for SSR',
      status: 500,
    };
  }
};
