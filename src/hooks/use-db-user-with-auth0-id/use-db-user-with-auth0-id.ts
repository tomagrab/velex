import { CustomError } from '@/lib/interfaces/utilities/custom-error/custom-error';
import { User } from '@prisma/client';
import { useState, useEffect } from 'react';

export const useDbUserWithAuth0Id = (userId: string | null | undefined) => {
  const [dbUser, setDbUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<CustomError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId || userId === null || userId === undefined) {
          const customError: CustomError = {
            name: 'Error',
            message: 'User ID is null or undefined',
          };
          throw customError;
        }
        const user = await fetch(
          `/api/users/${userId}/db-user-with-auth0-id`,
        ).then(res => res.json());
        setDbUser(user);
      } catch (error: unknown) {
        const customError = error as CustomError;
        setError(customError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return {
    dbUser,
    loading,
    error,
  };
};
