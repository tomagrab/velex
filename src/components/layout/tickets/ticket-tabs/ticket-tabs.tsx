'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TicketsTableTab from '@/components/layout/tickets/ticket-tabs/tickets-table-tab/tickets-table-tab';
import CreateTicketTab from '@/components/layout/tickets/ticket-tabs/create-ticket-tab/create-ticket-tab';
import TicketsAnalyticsTab from '@/components/layout/tickets/ticket-tabs/tickets-analytics-tab/tickets-analytics-tab';
import { Ticket } from '@prisma/client';

type TicketTabsProps = {
  tickets: Ticket[];
};

export default function TicketTabs({ tickets }: TicketTabsProps) {
  const [activeTab, setActiveTab] = useState('TicketsTableTab');

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
        <TicketsTableTab tickets={tickets} setActiveTab={setActiveTab} />
      </TabsContent>

      {/* Create Ticket Tab */}
      <TabsContent value="CreateTicketTab">
        <CreateTicketTab />
      </TabsContent>

      {/* Analytics Tab */}
      <TabsContent value="TicketsAnalyticsTab">
        <TicketsAnalyticsTab />
      </TabsContent>
    </Tabs>
  );
}
