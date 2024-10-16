'use client';

import { GenericAreaChartStacked } from '@/components/layout/charts/generic-area-chart-stacked/generic-area-chart-stacked';
import { GenericBarChart } from '@/components/layout/charts/generic-bar-chart/generic-bar-chart';
import { GenericPieChartDonutWithText } from '@/components/layout/charts/generic-pie-chart-donut-with-text/generic-pie-chart-donut-with-text';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { ChartConfig } from '@/components/ui/chart';

export default function TicketsAnalyticsTab() {
  const barChartdata = [
    { key: 'January', value: 400 },
    { key: 'February', value: 300 },
    { key: 'March', value: 200 },
    { key: 'April', value: 278 },
    { key: 'May', value: 189 },
    { key: 'June', value: 239 },
  ];

  const barChartconfig: ChartConfig = {
    title: { label: 'Tickets' },
    xLabel: { label: 'Months' },
    yLabel: { label: 'Tickets' },
    color: { color: '#3182CE' },
  };

  const pieChartDonutWithTextData = [
    { browser: 'chrome', visitors: 275, color: '#2563eb' },
    { browser: 'safari', visitors: 200, color: '#10b981' },
    { browser: 'firefox', visitors: 287, color: '#f97316' },
  ];

  const pieChartDonutWithTextConfig = {
    chrome: { label: 'Chrome', color: '#2563eb' },
    safari: { label: 'Safari', color: '#10b981' },
    firefox: { label: 'Firefox', color: '#f97316' },
  };

  const areaChartData = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
  ];

  const areaChartConfig = {
    desktop: { label: 'Desktop', color: '#2563eb' },
    mobile: { label: 'Mobile', color: '#10b981' },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>
          View ticket analytics and reports here.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex">
          <GenericBarChart
            data={barChartdata}
            dataKey="key"
            valueKey="value"
            getData={() => barChartdata}
            config={barChartconfig}
          />

          <GenericPieChartDonutWithText
            data={pieChartDonutWithTextData}
            dataKey="browser"
            valueKey="visitors"
            getData={data => data} // No transformation for now
            config={pieChartDonutWithTextConfig}
          />

          <GenericAreaChartStacked
            data={areaChartData}
            xAxisKey="month"
            yKeys={['desktop', 'mobile']}
            getData={() => areaChartData}
            config={areaChartConfig}
          />
        </div>
      </CardContent>
    </Card>
  );
}
