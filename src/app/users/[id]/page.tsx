import { GetUser } from '@/app/server/users/[id]/get-user';
import PageHeading from '@/components/layout/page-heading/page-heading';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Image from 'next/image';

export default withPageAuthRequired(
  async function UserPage({
    params,
  }: {
    params?: Record<string, string | string[]>;
  }) {
    const id = params?.id as string;

    if (!id) {
      return <div>No user ID provided</div>;
    }

    const user = await GetUser(id);

    if (!user || !user.data || user.data === undefined) {
      return <div>User not found</div>;
    }

    return (
      <div className="flex flex-1 flex-col gap-4">
        <PageHeading title={user.data.name} />
        <Image
          className="rounded-full"
          src={user.data.picture}
          alt={user.data.name}
          width={100}
          height={100}
        />
      </div>
    );
  },
  { returnTo: '/' },
);
