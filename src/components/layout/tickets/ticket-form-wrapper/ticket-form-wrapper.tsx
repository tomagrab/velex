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
import { useUser } from '@auth0/nextjs-auth0/client';
import { Loader } from 'lucide-react';
import { CommonTicketType } from '@/lib/types/layout/tickets/common-ticket-type/common-ticket-type';
import { Category, Status, SubCategory, User } from '@prisma/client';

type TicketFormWrapperProps = {
  dbUser: User | null;
  ticket?: CommonTicketType | null;
  statuses: Status[] | null;
  categories: Category[] | null;
  subCategories: SubCategory[] | null;
};

export default function TicketFormWrapper({
  dbUser,
  ticket,
  statuses,
  categories,
  subCategories,
}: TicketFormWrapperProps) {
  const { user, isLoading, error } = useUser();

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

  if (isLoading) {
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
        <Loader className="h-6 w-6 animate-spin" />
      </CardContent>
    </Card>;
  }

  if (!user) {
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
          <p className="text-red-500">
            <strong>Not authenticated</strong>
          </p>
        </CardContent>
      </Card>
    );
  }

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
          dbUser={dbUser}
          isEditMode={isEditMode}
          ticket={ticket}
          statuses={statuses}
          categories={categories}
          subCategories={subCategories}
        />
      </CardContent>
    </Card>
  );
}
