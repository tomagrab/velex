import PageHeading from '@/components/layout/page-heading/page-heading';
import Profile from '@/components/layout/settings/profile/prolie';
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect('/api/auth/login');
  }

  return (
    <div className="flex flex-1 flex-col">
      <PageHeading title="Profile" />
      <Profile />
    </div>
  );
}
