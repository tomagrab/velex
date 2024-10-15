import PageHeading from '@/components/layout/page-heading/page-heading';
import TicketFormWrapper from '@/components/layout/tickets/ticket-form-wrapper/ticket-form-wrapper';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(
  async function TicketPage({
    params,
  }: {
    params?: Record<string, string | string[]>;
  }) {
    const ticketId = params?.id as string;

    if (!ticketId) {
      return <div>No ticket ID provided</div>;
    }

    return (
      <div className="flex flex-1 flex-col gap-4">
        <PageHeading title={`Ticket # ${ticketId}`} />
        <TicketFormWrapper ticketId={ticketId} />
      </div>
    );
  },
  { returnTo: '/' },
);
