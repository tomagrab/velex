'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GenericPieChartDonutWithText } from '@/components/layout/charts/generic-pie-chart-donut-with-text/generic-pie-chart-donut-with-text';
import { ChartConfig } from '@/components/ui/chart';
import { Loader } from 'lucide-react';
import { CustomError } from '@/lib/interfaces/utilities/custom-error/custom-error';
import { TicketAnalyticsType } from '@/lib/types/layout/tickets/ticket-analytics/ticket-analytics-type';

type TicketsByCategoryPieChartProps = {
  loading: boolean;
  error: CustomError | null;
  ticketsByCategory: TicketAnalyticsType;
};

export default function TicketsByCategoryPieChart({
  loading,
  error,
  ticketsByCategory,
}: TicketsByCategoryPieChartProps) {
  // Pie Chart Configuration for Tickets by Category
  const pieChartConfig: ChartConfig = ticketsByCategory.reduce(
    (acc, item) => ({
      ...acc,
      [item.key]: {
        label: item.key,
        color: getColorForCategories(item.key),
      },
    }),
    {},
  );

  // Pie Chart Data
  const pieChartData = ticketsByCategory.map(item => ({
    ...item,
    color: getColorForCategories(item.key),
  }));

  // Function to assign colors to categories
  function getColorForCategories(status: string): string {
    const colors = ['#2563eb', '#10b981', '#f97316', '#e11d48', '#8b5cf6'];
    const index = status.length % colors.length;
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
        <CardTitle>Total Tickets by Category</CardTitle>
        <CardDescription>
          View the total number of tickets per category.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GenericPieChartDonutWithText
          data={pieChartData}
          dataKey="key"
          valueKey="value"
          getData={() => pieChartData}
          config={pieChartConfig}
        />
      </CardContent>
    </Card>
  );
}
