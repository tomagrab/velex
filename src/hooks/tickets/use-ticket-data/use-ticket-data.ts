import { CustomError } from '@/lib/interfaces/utilities/custom-error/custom-error';
import { Category, Prisma, Status, SubCategory, Ticket } from '@prisma/client';
import { useEffect, useState } from 'react';

export const useTicketData = (ticketId?: Ticket['id']) => {
  const [ticket, setTicket] = useState<Prisma.TicketGetPayload<{
    include: {
      creator: true;
      owner: true;
      status: true;
      category: true;
      subCategory: true;
      notes: true;
    };
  }> | null>(null);
  const [availableStatus, setAvailableStatus] = useState<Status[] | null>(null);
  const [availableCategory, setAvailableCategory] = useState<Category[] | null>(
    null,
  );
  const [availableSubCategory, setAvailableSubCategory] = useState<
    SubCategory[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<CustomError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch ticket if editing
        if (ticketId) {
          const ticketData = await fetch(`/api/tickets/${ticketId}`).then(res =>
            res.json(),
          );
          setTicket(ticketData);
        }

        // Fetch available statuses, categories, and subcategories
        const [statuses, categories, subcategories] = await Promise.all([
          fetch('/api/status').then(res => res.json()),
          fetch('/api/category').then(res => res.json()),
          fetch('/api/subcategory').then(res => res.json()),
        ]);

        setAvailableStatus(statuses);
        setAvailableCategory(categories);
        setAvailableSubCategory(subcategories);
      } catch (error: unknown) {
        const customError = error as CustomError;
        setError(customError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ticketId]);

  return {
    ticket,
    availableStatus,
    availableCategory,
    availableSubCategory,
    loading,
    error,
  };
};
