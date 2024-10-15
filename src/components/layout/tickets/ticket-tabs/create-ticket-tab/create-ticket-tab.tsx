import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TicketForm from '@/components/layout/tickets/ticket-form/ticket-form';
import { cn } from '@/lib/utils';

type CreateTicketTabProps = {
  handleEditModeClick: () => void;
  isEditMode: boolean;
};

export default function CreateTicketTab({
  handleEditModeClick,
  isEditMode,
}: CreateTicketTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div>Create Ticket</div>
          <div>
            <Badge
              onClick={() => handleEditModeClick()}
              className={cn(
                'cursor-pointer select-none text-sm text-white',
                isEditMode
                  ? 'bg-yellow-500 hover:bg-yellow-400'
                  : 'bg-green-500 hover:bg-green-400',
              )}
            >
              {isEditMode ? 'View' : 'Edit'}
            </Badge>
          </div>
        </CardTitle>
        <CardDescription>
          Fill out the form to create a new ticket.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <TicketForm isEditMode={isEditMode} />
      </CardContent>
    </Card>
  );
}
