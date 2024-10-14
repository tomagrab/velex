import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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
        <div className="space-y-1">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Enter ticket title" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Input id="description" placeholder="Enter ticket description" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Create Ticket</Button>
      </CardFooter>
    </Card>
  );
}
