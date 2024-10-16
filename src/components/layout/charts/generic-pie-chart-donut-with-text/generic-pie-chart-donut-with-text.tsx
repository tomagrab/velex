'use client';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import { Pie, PieChart, Label, Cell } from 'recharts';

type GenericPieChartDonutWithTextProps<T> = {
  data: T[];
  dataKey: string;
  valueKey: string;
  getData: (data: T[], config: ChartConfig) => Array<Record<string, unknown>>;
  config: ChartConfig;
  labelText?: string;
};

export function GenericPieChartDonutWithText<T>({
  data,
  dataKey,
  valueKey,
  getData,
  config,
  labelText = 'Total',
}: GenericPieChartDonutWithTextProps<T>) {
  const [chartData, setChartData] = useState<Array<Record<string, unknown>>>(
    [],
  );
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const transformedData = getData(data, config);
    setChartData(transformedData);
    const totalValue = transformedData.reduce(
      (acc, curr) => acc + (curr[valueKey] as number),
      0,
    );
    setTotal(totalValue);
  }, [data, config, getData, valueKey]);

  return (
    <ChartContainer
      config={config}
      className="mx-auto aspect-square max-h-[250px]" // Add responsive styles
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={chartData}
          dataKey={valueKey}
          nameKey={dataKey}
          innerRadius={60}
          outerRadius={80}
          strokeWidth={5}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={typeof entry.color === 'string' ? entry.color : '#000000'}
            />
          ))}
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {total.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      {labelText}
                    </tspan>
                  </text>
                );
              }
              return null;
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
