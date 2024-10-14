import { GetTicket } from '@/app/server/tickets/[id]/get-ticket';
import PageHeading from '@/components/layout/page-heading/page-heading';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(
  async function TicketPage({
    params,
  }: {
    params?: Record<string, string | string[]>;
  }) {
    const id = params?.id as string;

    if (!id) {
      return <div>No user ID provided</div>;
    }

    const ticket = await GetTicket(id);

    if (!ticket || !ticket.data || ticket.data === undefined) {
      return <div>Ticket not found</div>;
    }

    return (
      <div className="flex flex-1 flex-col gap-4">
        <PageHeading title={ticket.data.id} />
        <div>{ticket.data.assignedToId}</div>
      </div>
    );
  },
  { returnTo: '/' },
);
