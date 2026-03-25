export interface IRatingChartPoint {
  index: number;
  value: number;
}

export interface IRatingChartProps {
  data: IRatingChartPoint[];
  title: string;
}
