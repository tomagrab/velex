import { Metadata } from 'next';
import PageHeading from '@/components/layout/page-heading/page-heading';

export const metadata: Metadata = {
  title: 'Tickets | velex',
  description:
    'Tickets is where you can view, create, update, and delete tickets.',
};

export default function TicketsPage() {
  return (
    <div>
      <PageHeading title="Tickets" />
      <div>
        <p>This is the tickets page.</p>
      </div>
    </div>
  );
}
