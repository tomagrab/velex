import { Metadata } from 'next';
import PageHeading from '@/components/layout/page-heading/page-heading';

export const metadata: Metadata = {
  title: 'Users | velex',
  description: 'Users is where you can view, create, update, and delete users.',
};

export default function UsersPage() {
  return (
    <div>
      <PageHeading title="Users" />
      <div>
        <p>This is the Users page.</p>
      </div>
    </div>
  );
}
