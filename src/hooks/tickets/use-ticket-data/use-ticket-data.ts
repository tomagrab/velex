import { CustomError } from '@/lib/interfaces/utilities/custom-error/custom-error';
import {
  Category,
  Prisma,
  Status,
  SubCategory,
  Ticket,
  User,
} from '@prisma/client';
import { useEffect, useState } from 'react';

type useTicketDataProps = {
  ticketId?: Ticket['id'];
  userAuth0Id?: string | null | undefined;
};

export const useTicketData = ({
  ticketId,
  userAuth0Id,
}: useTicketDataProps) => {
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
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [availableStatus, setAvailableStatus] = useState<Status[] | null>(null);
  const [availableCategory, setAvailableCategory] = useState<Category[] | null>(
    null,
  );
  const [availableSubCategory, setAvailableSubCategory] = useState<
    SubCategory[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<CustomError | null>(null);
  const [dbUser, setDbUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        if (userAuth0Id) {
          const userData = await fetch(
            `/api/users/${userAuth0Id}/db-user-with-auth0-id`,
          )
            .then(res => res.json())
            .catch(error => {
              const customError = error as CustomError;
              setError(customError);
            });
          setDbUser(userData);
        }

        // Fetch ticket if editing
        if (ticketId) {
          const ticketData = await fetch(`/api/tickets/${ticketId}`)
            .then(res => res.json())
            .catch(error => {
              const customError = error as CustomError;
              setError(customError);
            });
          setTicket(ticketData);
          setIsUpdating(true);
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
  }, [ticketId, userAuth0Id]);

  return {
    dbUser,
    ticket,
    isUpdating,
    availableStatus,
    availableCategory,
    availableSubCategory,
    loading,
    error,
  };
};
