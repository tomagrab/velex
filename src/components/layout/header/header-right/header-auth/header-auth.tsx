'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import UserDropdown from './user-dropdown/user-dropdown';
import { Loader } from 'lucide-react';

export default function HeaderAuth() {
  const { user, error, isLoading } = useUser();

  return (
    <>
      {user ? (
        <UserDropdown user={user} />
      ) : isLoading ? (
        <Loader className="animate-spin" />
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <Link href="/api/auth/login">Login</Link>
      )}
    </>
  );
}
