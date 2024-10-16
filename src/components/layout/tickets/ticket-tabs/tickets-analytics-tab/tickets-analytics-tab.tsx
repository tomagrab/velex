'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
// import { useRouter, useSearchParams } from 'next/navigation';
import TicketsPerMonthBarChart from '@/components/layout/tickets/ticket-tabs/tickets-analytics-tab/ticket-bar-charts/tickets-per-month-bar-chart/tickets-per-month-bar-chart';
import TicketsByCategoryBarChart from '@/components/layout/tickets/ticket-tabs/tickets-analytics-tab/ticket-bar-charts/tickets-by-category-bar-chart/tickets-by-category-bar-chart';
import TicketsByStatusBarChart from '@/components/layout/tickets/ticket-tabs/tickets-analytics-tab/ticket-bar-charts/tickets-by-status-bar-chart/tickets-by-status-bar-chart';
import TicketsPerMonthPieChart from '@/components/layout/tickets/ticket-tabs/tickets-analytics-tab/ticket-pie-charts/tickets-per-month-pie-chart/tickets-per-month-pie-chart';
import TicketsByCategoryPieChart from '@/components/layout/tickets/ticket-tabs/tickets-analytics-tab/ticket-pie-charts/tickets-by-category-pie-chart/tickets-by-category-pie-chart';
import TicketsByStatusPieChart from '@/components/layout/tickets/ticket-tabs/tickets-analytics-tab/ticket-pie-charts/tickets-by-status-pie-chart/tickets-by-status-pie-chart';
import { useTicketAnalytics } from '@/hooks/tickets/use-ticket-analytics/use-ticket-analytics';
import TicketsPerMonthAreaChart from '@/components/layout/tickets/ticket-tabs/tickets-analytics-tab/ticket-area-charts/tickets-per-month-area-chart/tickets-per-month-area-chart';
import TicketsByStatusAreaChart from '@/components/layout/tickets/ticket-tabs/tickets-analytics-tab/ticket-area-charts/tickets-by-status-area-chart/tickets-by-status-area-chart';
import TicketsByCategoryAreaChart from '@/components/layout/tickets/ticket-tabs/tickets-analytics-tab/ticket-area-charts/tickets-by-category-area-chart/tickets-by-category-area-chart';
import { UserProfile } from '@auth0/nextjs-auth0/client';

type TicketsAnalyticsTabProps = {
  user: UserProfile;
  isLoading: boolean;
  error: Error | undefined;
};

export default function TicketsAnalyticsTab({
  user,
  isLoading,
  error,
}: TicketsAnalyticsTabProps) {
  const {
    ticketsAnalyticsLoading,
    ticketsAnalyticsError,
    ticketsPerMonth,
    ticketsByCategory,
    ticketsByStatus,
  } = useTicketAnalytics();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>
          View ticket analytics and reports here.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="bar-charts">
            <AccordionTrigger>Bar Charts</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 lg:flex-row">
              <TicketsPerMonthBarChart
                loading={ticketsAnalyticsLoading}
                error={ticketsAnalyticsError}
                ticketsPerMonth={ticketsPerMonth}
              />
              <TicketsByCategoryBarChart
                loading={ticketsAnalyticsLoading}
                error={ticketsAnalyticsError}
                ticketsByCategory={ticketsByCategory}
              />
              <TicketsByStatusBarChart
                loading={ticketsAnalyticsLoading}
                error={ticketsAnalyticsError}
                ticketsByStatus={ticketsByStatus}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="pie-charts">
            <AccordionTrigger>Pie Charts</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 lg:flex-row">
              <TicketsPerMonthPieChart
                loading={ticketsAnalyticsLoading}
                error={ticketsAnalyticsError}
                ticketsPerMonth={ticketsPerMonth}
              />
              <TicketsByCategoryPieChart
                loading={ticketsAnalyticsLoading}
                error={ticketsAnalyticsError}
                ticketsByCategory={ticketsByCategory}
              />
              <TicketsByStatusPieChart
                loading={ticketsAnalyticsLoading}
                error={ticketsAnalyticsError}
                ticketsByStatus={ticketsByStatus}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="line-charts">
            <AccordionTrigger>Stacked Area Charts</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 lg:flex-row">
              <TicketsPerMonthAreaChart
                loading={ticketsAnalyticsLoading}
                error={ticketsAnalyticsError}
                ticketsPerMonth={ticketsPerMonth}
              />
              <TicketsByCategoryAreaChart
                loading={ticketsAnalyticsLoading}
                error={ticketsAnalyticsError}
                ticketsByCategory={ticketsByCategory}
              />
              <TicketsByStatusAreaChart
                loading={ticketsAnalyticsLoading}
                error={ticketsAnalyticsError}
                ticketsByStatus={ticketsByStatus}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
