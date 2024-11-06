import { GetCategories } from '@/app/server/categories/get-categories';
import { GetStatuses } from '@/app/server/statuses/get-statuses';
import { GetSubCategories } from '@/app/server/subcategories/get-subcategories';
import { GetTicket } from '@/app/server/tickets/[id]/get-ticket';
import { GetDBUser } from '@/app/server/users/db-users/[id]/get-user';
import PageHeading from '@/components/layout/page-heading/page-heading';
import TicketFormWrapper from '@/components/layout/tickets/ticket-form-wrapper/ticket-form-wrapper';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(
  async function TicketPage({
    params,
  }: {
    params?: Record<string, string | string[]>;
  }) {
    const session = await getSession();
    const user = session?.user;
    const userAuth0Id = user?.sub;

    const ticketId = params?.id as string;

    if (!ticketId) {
      return <div>No ticket ID provided</div>;
    }

    const dbUser = await GetDBUser(userAuth0Id);

    const ticket = await GetTicket(ticketId);

    if (!ticket) {
      return <div>Ticket not found</div>;
    }

    const statuses = await GetStatuses();
    const categories = await GetCategories();
    const subCategories = await GetSubCategories();

    return (
      <div className="flex flex-1 flex-col gap-4">
        <PageHeading title={`Ticket # ${ticket.number}`} />
        <TicketFormWrapper
          dbUser={dbUser}
          ticket={ticket}
          statuses={statuses}
          categories={categories}
          subCategories={subCategories}
        />
      </div>
    );
  },
  { returnTo: '/' },
);
