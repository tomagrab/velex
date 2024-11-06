import prisma from '@/lib/db/prisma/prisma';
import { Status } from '@prisma/client';

// Utility function to fetch all statuses for SSR pages
export const GetStatuses = async (): Promise<Status[] | null> => {
  try {
    // Fetch statuses from the database
    const statuses = await prisma.status.findMany();

    if (!statuses || statuses.length === 0) {
      return null;
    }

    return statuses;
  } catch (error) {
    console.error('Error fetching statuses:', error);
    return null;
  }
};
