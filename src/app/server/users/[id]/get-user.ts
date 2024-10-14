import prisma from '@/lib/db/prisma/prisma';
import { User } from '@prisma/client';
import { CommonResponse } from '@/lib/types/api/common-response/common-response';

// Utility function to fetch a single user for SSR pages
export const GetUser = async (
  id: string,
): Promise<CommonResponse<User | null>> => {
  try {
    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return {
        success: false,
        data: null,
        error: 'User not found',
        status: 404,
      };
    }

    return { success: true, data: user, error: 'No errors!', status: 200 };
  } catch (error) {
    console.error('Error fetching user for SSR:', error);
    return {
      success: false,
      data: null,
      error: 'Error fetching user for SSR',
      status: 500,
    };
  }
};
