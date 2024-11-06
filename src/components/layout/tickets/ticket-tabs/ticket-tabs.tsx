'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TicketsTableTab from '@/components/layout/tickets/ticket-tabs/tickets-table-tab/tickets-table-tab';
import CreateTicketTab from '@/components/layout/tickets/ticket-tabs/create-ticket-tab/create-ticket-tab';
import TicketsAnalyticsTab from '@/components/layout/tickets/ticket-tabs/tickets-analytics-tab/tickets-analytics-tab';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Loader } from 'lucide-react';
import { CommonTicketType } from '@/lib/types/layout/tickets/common-ticket-type/common-ticket-type';
import { Category, Status, SubCategory, User } from '@prisma/client';

type TicketTabsProps = {
  dbUser: User | null;
  tickets: CommonTicketType[] | null;
  statuses: Status[] | null;
  categories: Category[] | null;
  subCategories: SubCategory[] | null;
};

export default function TicketTabs({
  dbUser,
  tickets,
  statuses,
  categories,
  subCategories,
}: TicketTabsProps) {
  const { user, isLoading, error } = useUser();

  const router = useRouter();
  const searchParams = useSearchParams();

  const queryActiveTab = searchParams.get('activeTab') || 'TicketsTableTab';
  const queryIsEditMode = searchParams.get('isEditMode') === 'true';

  const [isEditMode, setIsEditMode] = useState(queryIsEditMode);
  const [activeTab, setActiveTab] = useState(queryActiveTab);

  useEffect(() => {
    const currentParams = searchParams.toString();
    const newParams = `?activeTab=${activeTab}&isEditMode=${isEditMode}`;

    if (currentParams !== newParams) {
      router.replace(newParams);
    }
  }, [activeTab, isEditMode, router, searchParams]);

  const handleCreateButtonClick = () => {
    setActiveTab('CreateTicketTab');
    setIsEditMode(true);
  };

  if (!user || isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-4 grid w-full grid-cols-3">
        <TabsTrigger value="TicketsTableTab">Tickets</TabsTrigger>
        <TabsTrigger value="CreateTicketTab">Create</TabsTrigger>
        <TabsTrigger value="TicketsAnalyticsTab">Analytics</TabsTrigger>
      </TabsList>

      <TabsContent value="TicketsTableTab">
        <TicketsTableTab
          user={user}
          isLoading={isLoading}
          error={error}
          tickets={tickets}
          handleCreateButtonClick={handleCreateButtonClick}
        />
      </TabsContent>

      <TabsContent value="CreateTicketTab">
        <CreateTicketTab
          dbUser={dbUser}
          statuses={statuses}
          categories={categories}
          subCategories={subCategories}
        />
      </TabsContent>

      <TabsContent value="TicketsAnalyticsTab">
        <TicketsAnalyticsTab user={user} isLoading={isLoading} error={error} />
      </TabsContent>
    </Tabs>
  );
}
