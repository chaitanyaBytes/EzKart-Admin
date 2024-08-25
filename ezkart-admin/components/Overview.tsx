"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface OverviewProps {
  data: any;
}

const chartConfig = {
  monthlyRevenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const Overview: React.FC<OverviewProps> = ({ data }) => {
  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[280px] h-[350px] w-full"
    >
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />{" "}
        <Bar dataKey="total" fill="#3498db" radius={8} />
      </BarChart>
    </ChartContainer>
  );
};

export default Overview;
