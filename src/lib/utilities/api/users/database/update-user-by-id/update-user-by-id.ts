import prisma from '@/lib/db/prisma/prisma';
import { CommonResponse } from '@/lib/types/api/common-response/common-response';
import { User } from '@prisma/client';

export const updateUserInDatabase = async (
  auth0Id: string,
  data: {
    role: string;
    givenName: string;
    familyName: string;
    name: string;
  },
): Promise<CommonResponse<{ user: User }>> => {
  try {
    const updatedUser = await prisma.user.update({
      where: { auth0Id },
      data: {
        role: data.role,
        givenName: data.givenName,
        familyName: data.familyName,
        name: data.name,
      },
    });

    return { success: true, data: { user: updatedUser }, status: 200 };
  } catch (error) {
    console.error('Error updating user in the database:', error);
    return {
      success: false,
      error: 'Failed to update user in database',
      status: 500,
    };
  }
};
