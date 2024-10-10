'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { Loader } from 'lucide-react';
import Image from 'next/image';

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Loader className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (error || !user) {
    return null;
  }

  const userName = user.name ?? 'User';
  const userEmail = user.email ?? 'No email';
  const userPicture = user.picture ?? 'https://picsum.photos/64';

  return (
    <section className="mx-auto flex flex-col items-center py-4 md:flex-row md:justify-center">
      <div className="flex justify-center md:w-auto">
        <Image
          height={150}
          width={150}
          src={userPicture}
          alt={userName}
          className="rounded-full object-cover"
        />
      </div>
      <div className="text-center md:ml-8 md:mt-0 md:w-2/3 md:text-left">
        <h2 className="text-3xl font-bold">{userName}</h2>
        <p className="text-lg text-gray-600">{userEmail}</p>
      </div>
    </section>
  );
}
