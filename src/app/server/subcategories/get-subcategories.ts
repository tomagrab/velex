import prisma from '@/lib/db/prisma/prisma';
import { SubCategory } from '@prisma/client';

// Utility function to fetch all categories for SSR pages
export const GetSubCategories = async (): Promise<SubCategory[] | null> => {
  try {
    // Fetch categories from the database
    const subCategories = await prisma.subCategory.findMany();

    if (!subCategories || subCategories.length === 0) {
      return null;
    }

    return subCategories;
  } catch (error) {
    console.error('Error fetching subCategories:', error);
    return null;
  }
};
