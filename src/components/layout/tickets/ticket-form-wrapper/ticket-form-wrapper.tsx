'use client';

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
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type TicketFormWrapperProps = {
  ticketId: string;
};

export default function TicketFormWrapper({
  ticketId,
}: TicketFormWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams(); // Read query parameters

  // Get initial values from the URL query params
  const queryIsEditMode = searchParams.get('isEditMode') === 'true';

  const [isEditMode, setIsEditMode] = useState(queryIsEditMode);

  // Sync state with URL when the user switches tabs
  useEffect(() => {
    router.replace(`?isEditMode=${isEditMode}`);
  }, [isEditMode, router]);

  const handleEditModeClick = () => {
    setIsEditMode(prev => !prev);
  };

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
        <TicketForm isEditMode={isEditMode} ticketId={ticketId} />
      </CardContent>
    </Card>
  );
}
