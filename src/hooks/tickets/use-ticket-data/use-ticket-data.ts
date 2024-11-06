import { CustomError } from '@/lib/interfaces/utilities/custom-error/custom-error';
import { User } from '@prisma/client';
import { useEffect, useState } from 'react';

type useTicketDataProps = {
  userAuth0Id?: string | null | undefined;
};

export const useTicketData = ({ userAuth0Id }: useTicketDataProps) => {
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
      } catch (error: unknown) {
        const customError = error as CustomError;
        setError(customError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userAuth0Id]);

  return {
    dbUser,
    loading,
    error,
  };
};
