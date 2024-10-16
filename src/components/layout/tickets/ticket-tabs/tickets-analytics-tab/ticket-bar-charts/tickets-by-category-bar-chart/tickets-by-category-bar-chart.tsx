'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GenericBarChart } from '@/components/layout/charts/generic-bar-chart/generic-bar-chart';
import { ChartConfig } from '@/components/ui/chart';
import { CustomError } from '@/lib/interfaces/utilities/custom-error/custom-error';
import { TicketAnalyticsType } from '@/lib/types/layout/tickets/ticket-analytics/ticket-analytics-type';
import { Loader } from 'lucide-react';

type TicketsByCategoryBarChartProps = {
  loading: boolean;
  error: CustomError | null;
  ticketsByCategory: TicketAnalyticsType;
};

export default function TicketsByCategoryBarChart({
  loading,
  error,
  ticketsByCategory,
}: TicketsByCategoryBarChartProps) {
  // Bar Chart Data for Tickets
  const barChartData = ticketsByCategory.map(item => ({
    ...item,
    color: getColorForCategory(item.key),
  }));

  // Bar Chart Configuration for Tickets per Month
  const barChartConfig: ChartConfig = {
    title: { label: 'Tickets per Month' },
    xLabel: { label: 'Month' },
    yLabel: { label: 'Tickets' },
    color: { color: '#3182CE' },
  };

  // Function to assign colors to categories
  function getColorForCategory(category: string): string {
    const colors = ['#2563eb', '#10b981', '#f97316', '#e11d48', '#8b5cf6'];
    const index = category.length % colors.length;
    return colors[index];
  }

  if (loading) {
    return (
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Total Tickets Per Month</CardTitle>
          <CardDescription>
            View the total number of tickets per month.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <Loader className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Total Tickets Per Month</CardTitle>
          <CardDescription>
            View the total number of tickets per month.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-red-500">{error.message}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Total Tickets By Category</CardTitle>
        <CardDescription>
          View the total number of tickets by category.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GenericBarChart
          data={barChartData}
          dataKey="key"
          valueKey="value"
          getData={() => barChartData}
          config={barChartConfig}
        />
      </CardContent>
    </Card>
  );
}
