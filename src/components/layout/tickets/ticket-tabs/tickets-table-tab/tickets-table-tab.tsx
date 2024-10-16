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
import { Loader } from 'lucide-react';

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
  if (error) {
    return (
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>Tickets</CardTitle>
            <CardDescription>
              View and manage your tickets here.
            </CardDescription>
          </div>
          <div>
            <Button onClick={() => handleCreateButtonClick()}>
              Create Ticket
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>Error fetching tickets {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  if (!user || isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>Tickets</CardTitle>
            <CardDescription>
              View and manage your tickets here.
            </CardDescription>
          </div>
          <div>
            <Button onClick={() => handleCreateButtonClick()}>
              Create Ticket
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <Loader className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

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
