import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Ticket } from '@prisma/client';
import TicketsTable from '@/components/layout/tickets/ticket-table/ticket-table';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@auth0/nextjs-auth0/client';

type TicketTableProps = {
  user: UserProfile;
  isLoading: boolean;
  error: Error | undefined;
  tickets: Ticket[];
  handleCreateButtonClick: () => void;
};

export default function TicketsTableTab({
  user,
  isLoading,
  error,
  tickets,
  handleCreateButtonClick,
}: TicketTableProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Tickets</CardTitle>
          <CardDescription>View and manage your tickets here.</CardDescription>
        </div>
        <div>
          <Button onClick={() => handleCreateButtonClick()}>
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
