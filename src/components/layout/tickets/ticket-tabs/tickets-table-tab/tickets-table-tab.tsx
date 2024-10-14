import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Dispatch, SetStateAction } from 'react';
import { Ticket } from '@prisma/client';
import TicketsTable from '@/components/layout/tickets/ticket-table/ticket-table';
import { Button } from '@/components/ui/button';

type TicketsTabProps = {
  tickets: Ticket[];
  setActiveTab: Dispatch<SetStateAction<string>>;
};

export default function TicketsTableTab({
  tickets,
  setActiveTab,
}: TicketsTabProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Tickets</CardTitle>
          <CardDescription>View and manage your tickets here.</CardDescription>
        </div>
        <div>
          <Button onClick={() => setActiveTab('CreateTicketTab')}>
            Create Ticket
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <TicketsTable tickets={tickets} />
      </CardContent>
    </Card>
  );
}
