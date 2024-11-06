import prisma from '@/lib/db/prisma/prisma';
import { Category } from '@prisma/client';

// Utility function to fetch all categories for SSR pages
export const GetCategories = async (): Promise<Category[] | null> => {
  try {
    // Fetch categories from the database
    const categories = await prisma.category.findMany();

    if (!categories || categories.length === 0) {
      return null;
    }

    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return null;
  }
};
