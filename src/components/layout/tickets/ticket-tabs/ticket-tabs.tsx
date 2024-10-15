'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Import necessary hooks
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
  const searchParams = useSearchParams(); // Read query parameters

  // Get initial values from the URL query params
  const queryActiveTab = searchParams.get('activeTab') || 'TicketsTableTab';
  const queryIsEditMode = searchParams.get('isEditMode') === 'true';

  const [isEditMode, setIsEditMode] = useState(queryIsEditMode);
  const [activeTab, setActiveTab] = useState(queryActiveTab);

  // Sync state with URL when the user switches tabs
  useEffect(() => {
    router.replace(`?activeTab=${activeTab}&isEditMode=${isEditMode}`);
  }, [activeTab, isEditMode, router]);

  const handleEditModeClick = () => {
    setIsEditMode(prev => !prev);
  };

  const handleCreateButtonClick = () => {
    setActiveTab('CreateTicketTab');
    setIsEditMode(true);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      {/* Tab List */}
      <TabsList className="mb-4 grid w-full grid-cols-3">
        <TabsTrigger value="TicketsTableTab">Tickets</TabsTrigger>
        <TabsTrigger value="CreateTicketTab">Create</TabsTrigger>
        <TabsTrigger value="TicketsAnalyticsTab">Analytics</TabsTrigger>
      </TabsList>

      {/* Tickets Tab */}
      <TabsContent value="TicketsTableTab">
        <TicketsTableTab
          tickets={tickets}
          handleCreateButtonClick={handleCreateButtonClick}
        />
      </TabsContent>

      {/* Create Ticket Tab */}
      <TabsContent value="CreateTicketTab">
        <CreateTicketTab
          handleEditModeClick={handleEditModeClick}
          isEditMode={isEditMode}
        />
      </TabsContent>

      {/* Analytics Tab */}
      <TabsContent value="TicketsAnalyticsTab">
        <TicketsAnalyticsTab />
      </TabsContent>
    </Tabs>
  );
}
