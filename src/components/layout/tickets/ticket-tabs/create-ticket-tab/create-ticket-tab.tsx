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
import { UserProfile } from '@auth0/nextjs-auth0/client';

type CreateTicketTabProps = {
  user: UserProfile;
  isLoading: boolean;
  error: Error | undefined;
  handleEditModeClick: () => void;
  isEditMode: boolean;
};

export default function CreateTicketTab({
  user,
  isLoading,
  error,
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
        <TicketForm
          user={user}
          userLoading={isLoading}
          userError={error}
          isEditMode={isEditMode}
        />
      </CardContent>
    </Card>
  );
}
