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

export default function TicketsAnalyticsTab() {
  const {
    loading,
    error,
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
                loading={loading}
                error={error}
                ticketsPerMonth={ticketsPerMonth}
              />
              <TicketsByCategoryBarChart
                loading={loading}
                error={error}
                ticketsByCategory={ticketsByCategory}
              />
              <TicketsByStatusBarChart
                loading={loading}
                error={error}
                ticketsByStatus={ticketsByStatus}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="pie-charts">
            <AccordionTrigger>Pie Charts</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 lg:flex-row">
              <TicketsPerMonthPieChart
                loading={loading}
                error={error}
                ticketsPerMonth={ticketsPerMonth}
              />
              <TicketsByCategoryPieChart
                loading={loading}
                error={error}
                ticketsByCategory={ticketsByCategory}
              />
              <TicketsByStatusPieChart
                loading={loading}
                error={error}
                ticketsByStatus={ticketsByStatus}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="line-charts">
            <AccordionTrigger>Stacked Area Charts</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 lg:flex-row">
              <TicketsPerMonthAreaChart
                loading={loading}
                error={error}
                ticketsPerMonth={ticketsPerMonth}
              />
              <TicketsByCategoryAreaChart
                loading={loading}
                error={error}
                ticketsByCategory={ticketsByCategory}
              />
              <TicketsByStatusAreaChart
                loading={loading}
                error={error}
                ticketsByStatus={ticketsByStatus}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
