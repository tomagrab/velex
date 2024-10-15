import PageHeading from '@/components/layout/page-heading/page-heading';
import TicketForm from '@/components/layout/tickets/ticket-form/ticket-form';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(
  async function TicketPage({
    params,
  }: {
    params?: Record<string, string | string[]>;
  }) {
    const id = params?.id as string;

    if (!id) {
      return <div>No ticket ID provided</div>;
    }

    return (
      <div className="flex flex-1 flex-col gap-4">
        <PageHeading title={`Ticket # ${id}`} />
        <div>
          <TicketForm ticketId={id} />
        </div>
      </div>
    );
  },
  { returnTo: '/' },
);
