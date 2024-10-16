import { CustomError } from '@/lib/interfaces/utilities/custom-error/custom-error';
import { User } from '@prisma/client';
import { useState, useEffect } from 'react';

export const useDbUserWithDbId = (userId: User['id']) => {
  const [dbUser, setDbUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<CustomError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await fetch(
          `/api/users/${userId}/db-user-with-db-id`,
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
