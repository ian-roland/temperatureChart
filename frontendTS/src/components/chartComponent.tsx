"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  temperature: {
    label: "Temperature",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ChartComponent() {
  interface TemperatureData {
    datetime: string;
    temperature: number;
  }

  const [data, setData] = useState<TemperatureData[]>([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://192.168.15.186:3334/temperature_and_datetime")
        .then((res) => {
          return res.json();
        })
        .then((result: TemperatureData[]) => {
          console.log(result);

          let newData: TemperatureData;

          if (Array.isArray(result) && result.length > 0) {
            newData = {
              datetime: new Date(result[0].datetime).toISOString(),
              temperature: Number(result[0].temperature),
            };
          } else if (typeof result === "object" && result !== null) {
            newData = {
              datetime: new Date(result.datetime).toISOString(),
              temperature: Number(result.temperature),
            };
          }

          setData((prevData) => {
            const updatedData = [newData, ...prevData].slice();
            return updatedData;
          });
        });
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Raspberry Pi CM4</CardTitle>
        <CardDescription>Temperature Chart</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 20,
              right: 30,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="datetime"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getHours()}:${date
                  .getMinutes()
                  .toString()
                  .padStart(2, "0")}:${date
                  .getSeconds()
                  .toString()
                  .padStart(2, "0")}`;
              }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              label={{
                value: "Temperature (°C)",
                angle: -90,
                position: "insideLeft",
              }}
              domain={[Math.min(...data.map((item) => item.value)), "dataMax"]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="temperature"
              type="linear"
              stroke="var(--color-temperature)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Data fetched from 192.168.15.186:3334/temperature_and_datetime{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
