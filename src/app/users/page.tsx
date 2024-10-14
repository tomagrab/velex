import { Metadata } from 'next';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import PageHeading from '@/components/layout/page-heading/page-heading';
import UserTable from '@/components/layout/users/user-table/user-table';
import { GetUsers } from '@/app/server/users/users';

export const metadata: Metadata = {
  title: 'Users | velex',
  description: 'Users is where you can view, create, update, and delete users.',
};

export default withPageAuthRequired(
  async function UsersPage() {
    // No need to pass req, getSession works automatically in SSR
    const session = await getSession();
    const user = session?.user;

    if (!user) {
      return <div>Unauthorized</div>;
    }

    const users = await GetUsers();

    if (!users || users.data === undefined) {
      return <div>Unauthorized or error fetching users.</div>;
    }

    return (
      <div className="flex flex-1 flex-col">
        <PageHeading title="Users" />
        <UserTable users={users.data} />
      </div>
    );
  },
  { returnTo: '/' },
);
