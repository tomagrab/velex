'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TicketsTableTab from '@/components/layout/tickets/ticket-tabs/tickets-table-tab/tickets-table-tab';
import CreateTicketTab from '@/components/layout/tickets/ticket-tabs/create-ticket-tab/create-ticket-tab';
import TicketsAnalyticsTab from '@/components/layout/tickets/ticket-tabs/tickets-analytics-tab/tickets-analytics-tab';
import { Ticket } from '@prisma/client';

type TicketTabsProps = {
  tickets: Ticket[];
};

export default function TicketTabs({ tickets }: TicketTabsProps) {
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

  const handleEditModeClick = () => {
    setIsEditMode(prev => !prev);
  };

  const handleCreateButtonClick = () => {
    setActiveTab('CreateTicketTab');
    setIsEditMode(true);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-4 grid w-full grid-cols-3">
        <TabsTrigger value="TicketsTableTab">Tickets</TabsTrigger>
        <TabsTrigger value="CreateTicketTab">Create</TabsTrigger>
        <TabsTrigger value="TicketsAnalyticsTab">Analytics</TabsTrigger>
      </TabsList>

      <TabsContent value="TicketsTableTab">
        <TicketsTableTab
          tickets={tickets}
          handleCreateButtonClick={handleCreateButtonClick}
        />
      </TabsContent>

      <TabsContent value="CreateTicketTab">
        <CreateTicketTab
          handleEditModeClick={handleEditModeClick}
          isEditMode={isEditMode}
        />
      </TabsContent>

      <TabsContent value="TicketsAnalyticsTab">
        <TicketsAnalyticsTab />
      </TabsContent>
    </Tabs>
  );
}
