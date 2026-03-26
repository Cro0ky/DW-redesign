"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  IRatingChartPoint,
  IRatingChartProps,
} from "@/types/rating-chart.types";

import styles from "./rating-chart.module.scss";

function yTicksForData(values: number[]): number[] {
  if (values.length === 0) return [200, 400, 600, 800, 1000];
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (min === max) {
    const base = Math.max(0, Math.floor(min / 200) * 200);
    return [base, base + 200, base + 400, base + 600, base + 800];
  }
  const pad = Math.max((max - min) * 0.12, 50);
  const low = Math.floor((min - pad) / 100) * 100;
  let high = Math.ceil((max + pad) / 100) * 100;
  if (high <= low + 100) high = low + 400;
  const step = (high - low) / 4;
  return [0, 1, 2, 3, 4].map((i) => Math.round(low + step * i));
}

function xTicksForLength(n: number): number[] {
  if (n <= 1) return [1];
  if (n >= 20) return [1, 5, 10, 15, 20];
  const last = n;
  const mid = Math.ceil(last / 2);
  return [
    ...new Set([1, Math.ceil(last / 4), mid, Math.ceil((3 * last) / 4), last]),
  ].sort((a, b) => a - b);
}

export const RatingChart = ({ data, title }: IRatingChartProps) => {
  const values = data.map((d) => d.value);
  const yTicks = yTicksForData(values);
  const domainY: [number, number] = [yTicks[0], yTicks[yTicks.length - 1]];
  const n = data[data.length - 1]?.index ?? data.length;
  const xTicks = xTicksForLength(n);

  return (
    <div className={styles.root}>
      <div className={styles.title}>{title}</div>
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 4 }}
          >
            <CartesianGrid
              stroke="rgba(255, 255, 255, 0.08)"
              strokeDasharray="4 6"
              vertical={false}
            />
            <XAxis
              dataKey="index"
              type="number"
              domain={[1, n]}
              ticks={xTicks}
              tick={{ fill: "rgba(199, 199, 199, 0.85)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              orientation="right"
              domain={domainY}
              ticks={yTicks}
              tick={{ fill: "rgba(199, 199, 199, 0.85)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={36}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#e53935"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export function mapRatingsToChartData(ratings: number[]): IRatingChartPoint[] {
  return ratings
    .map((value, i) => ({
      index: i + 1,
      value: Number(value),
    }))
    .filter((p) => Number.isFinite(p.value));
}
