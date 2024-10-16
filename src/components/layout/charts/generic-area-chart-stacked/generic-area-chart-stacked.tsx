'use client';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

type GenericAreaChartStackedProps<T> = {
  data: T[];
  xAxisKey: string;
  yKeys: string[];
  getData: (data: T[], config: ChartConfig) => Array<Record<string, unknown>>;
  config: ChartConfig;
};

export function GenericAreaChartStacked<T>({
  data,
  xAxisKey,
  yKeys,
  getData,
  config,
}: GenericAreaChartStackedProps<T>) {
  const [chartData, setChartData] = useState<Array<Record<string, unknown>>>(
    [],
  );

  useEffect(() => {
    const transformedData = getData(data, config);
    setChartData(transformedData);
  }, [data, config, getData]);

  return (
    <ChartContainer config={config} className="min-h-[300px] w-full">
      <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey={xAxisKey} tickLine={false} axisLine={false} />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />

        {yKeys.map(key => (
          <Area
            key={key}
            dataKey={key}
            type="natural"
            stackId="1"
            fill={`var(--color-${key})`}
            fillOpacity={0.4}
            stroke={`var(--color-${key})`}
          />
        ))}
      </AreaChart>
    </ChartContainer>
  );
}
