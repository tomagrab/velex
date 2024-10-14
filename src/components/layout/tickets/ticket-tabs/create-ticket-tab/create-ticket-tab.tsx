import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import TicketForm from '@/components/layout/tickets/ticket-form/ticket-form';

export default function CreateTicketTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Ticket</CardTitle>
        <CardDescription>
          Fill out the form to create a new ticket.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <TicketForm />
      </CardContent>
    </Card>
  );
}
