'use client';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts';

type GenericBarChartProps<T> = {
  data: T[];
  dataKey: string;
  valueKey: string;
  getData: (data: T[], config: ChartConfig) => Array<Record<string, unknown>>;
  config: ChartConfig;
};

export function GenericBarChart<T>({
  data,
  dataKey,
  valueKey,
  getData,
  config,
}: GenericBarChartProps<T>) {
  const [chartData, setChartData] = useState<Array<Record<string, unknown>>>(
    [],
  );

  useEffect(() => {
    const transformedData = getData(data, config);
    setChartData(transformedData);
  }, [data, config, getData]);

  return (
    <ChartContainer config={config} className="min-h-[300px] w-full">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey={dataKey} tickLine={false} axisLine={false} />
        <YAxis allowDecimals={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey={valueKey} radius={4} label={{ position: 'top' }}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color as string} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
