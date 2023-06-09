type TickerData = {
  last: number;
  change: number;
  percentChange: number;
  lastUpdate: string;
};

type ChartData = {
  date: string | Date;
  high: number;
  low: number;
  open: number;
  close: number;
};

export type { TickerData, ChartData };
