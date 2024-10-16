import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GenericAreaChartStacked } from '@/components/layout/charts/generic-area-chart-stacked/generic-area-chart-stacked';
import { ChartConfig } from '@/components/ui/chart';
import { Loader } from 'lucide-react';
import { CustomError } from '@/lib/interfaces/utilities/custom-error/custom-error';
import { TicketAnalyticsType } from '@/lib/types/layout/tickets/ticket-analytics/ticket-analytics-type';

type TicketsPerMonthAreaChartProps = {
  loading: boolean;
  error: CustomError | null;
  ticketsPerMonth: TicketAnalyticsType;
};

export default function TicketsPerMonthAreaChart({
  loading,
  error,
  ticketsPerMonth,
}: TicketsPerMonthAreaChartProps) {
  // Area Chart Data for Tickets per month
  const areaChartData = ticketsPerMonth.map(item => ({
    ...item,
    color: getColorForMonths(item.key),
  }));

  // Area Chart Configuration for Tickets per month
  const areaChartConfig: ChartConfig = {
    title: { label: 'Tickets per Month' },
    xLabel: { label: 'Month' },
    yLabel: { label: 'Tickets' },
    color: { color: '#3182CE' },
  };

  // Function to assign colors to months
  function getColorForMonths(status: string): string {
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
        <CardTitle>Total Tickets Per Month</CardTitle>
        <CardDescription>
          View the total number of tickets per month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GenericAreaChartStacked
          data={areaChartData}
          xAxisKey="key"
          yKeys={['value']}
          getData={() => areaChartData}
          config={areaChartConfig}
        />
      </CardContent>
    </Card>
  );
}
