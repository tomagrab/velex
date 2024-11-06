import { Metadata } from 'next';
import PageHeading from '@/components/layout/page-heading/page-heading';
import TicketTabs from '@/components/layout/tickets/ticket-tabs/ticket-tabs';
import { GetTickets } from '@/app/server/tickets/get-tickets';
import { GetStatuses } from '@/app/server/statuses/get-statuses';
import { GetCategories } from '@/app/server/categories/get-categories';
import { GetSubCategories } from '@/app/server/subcategories/get-subcategories';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetDBUser } from '@/app/server/users/db-users/[id]/get-user';

export const metadata: Metadata = {
  title: 'Tickets | velex',
  description:
    'Tickets is where you can view, create, update, and delete tickets.',
};

export default withPageAuthRequired(async function TicketsPage() {
  const session = await getSession();
  const user = session?.user;
  const userAuth0Id = user?.sub;
  const dbUser = await GetDBUser(userAuth0Id);
  const tickets = await GetTickets();
  const statuses = await GetStatuses();
  const categories = await GetCategories();
  const subCategories = await GetSubCategories();

  return (
    <div className="flex flex-1 flex-col gap-4">
      <PageHeading title="Tickets" />
      <TicketTabs
        dbUser={dbUser}
        tickets={tickets}
        statuses={statuses}
        categories={categories}
        subCategories={subCategories}
      />
    </div>
  );
});
