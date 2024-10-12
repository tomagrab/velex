import prisma from '@/lib/db/prisma/prisma';
import { CommonResponse } from '@/lib/types/api/common-response/common-response';
import { User } from '@prisma/client';

export const getUserFromDatabase = async (
  auth0Id: string,
): Promise<CommonResponse<{ user: User }>> => {
  try {
    const user = await prisma.user.findUnique({
      where: { auth0Id },
    });

    if (!user) {
      return { success: false, error: 'User not found', status: 404 };
    }

    return { success: true, data: { user }, status: 200 };
  } catch (error) {
    console.error('Error fetching user from database:', error);
    return {
      success: false,
      error: 'Failed to fetch user from database',
      status: 500,
    };
  }
};
