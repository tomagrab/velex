import { Metadata } from 'next';
import PageHeading from '@/components/layout/page-heading/page-heading';
import TicketTabs from '@/components/layout/tickets/ticket-tabs/ticket-tabs';
import { GetTickets } from '@/app/server/tickets/get-tickets';

export const metadata: Metadata = {
  title: 'Tickets | velex',
  description:
    'Tickets is where you can view, create, update, and delete tickets.',
};

export default async function TicketsPage() {
  const tickets = await GetTickets();

  if (!tickets || !tickets.data || tickets.data === undefined) {
    return (
      <div className="flex flex-1 flex-col gap-4">
        <PageHeading title="Tickets" />
        <p>No tickets!</p>
      </div>
    );
  }

  const ticketTabTickets = tickets.data;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <PageHeading title="Tickets" />
      <TicketTabs tickets={ticketTabTickets} />
    </div>
  );
}
