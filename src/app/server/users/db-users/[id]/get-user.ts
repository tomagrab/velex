import prisma from '@/lib/db/prisma/prisma';
import { User } from '@prisma/client';

// Utility function to fetch a single user for SSR pages
export const GetDBUser = async (id: string): Promise<User | null> => {
  try {
    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { auth0Id: id },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error fetching user for SSR:', error);
    return null;
  }
};
