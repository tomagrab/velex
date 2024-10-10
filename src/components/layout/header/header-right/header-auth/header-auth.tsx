'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import { determineAndApplyColorMode } from '@/lib/utilities/layout/header/header-right/color-mode-utility/color-mode-utility';
import Link from 'next/link';
import UserDropdown from '@/components/layout/header/header-right/header-auth/user-dropdown/user-dropdown';
import { Loader } from 'lucide-react';

export default function HeaderAuth() {
  useEffect(() => {
    // Determine and apply the correct color mode when the component mounts
    determineAndApplyColorMode();
  }, []);

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
