import prisma from '@/lib/db/prisma/prisma';
import { User } from '@prisma/client';
import { CommonResponse } from '@/lib/types/api/common-response/common-response';

// Utility function to fetch users for SSR pages
export const GetUsers = async (): Promise<CommonResponse<User[]> | null> => {
  try {
    // Fetch users from the database
    const users = await prisma.user.findMany();

    if (!users || users === undefined) {
      return {
        success: false,
        data: [],
        error: 'Error fetching users for SSR',
        status: 404,
      };
    }

    return { success: true, data: users, error: 'No errors!', status: 200 };
  } catch (error) {
    console.error('Error fetching users for SSR:', error);
    return {
      success: false,
      data: [],
      error: 'Error fetching users for SSR',
      status: 500,
    };
  }
};
