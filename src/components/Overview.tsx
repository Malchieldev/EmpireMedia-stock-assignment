import _ from "lodash";
import { format, differenceInDays } from "date-fns";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
  Tooltip,
} from "recharts";

import type { ChartData } from "@/types/types";

type OverviewProps = {
  chartData: ChartData[];
};

export default function Overview(props: OverviewProps) {
  const { chartData } = props;

  let dateFormat: string;

  const minDate = _.minBy(chartData, "date");
  const maxDate = _.maxBy(chartData, "date");

  const lastClose = _.last(chartData)?.close;
  if (minDate && maxDate) {
    dateFormat =
      differenceInDays(new Date(minDate.date), new Date(maxDate.date)) > 1
        ? "MMM, yy"
        : "HH:mm";
  }

  return (
    <div>
      <ResponsiveContainer
        id="chart"
        width="100%"
        height="100%"
        minHeight={400}
      >
        <AreaChart data={chartData}>
          <ReferenceLine
            x={50}
            y={lastClose}
            stroke="#B3CFA0"
            strokeDasharray="6 6"
            label={{
              value: lastClose,
              position: "right",
              fontSize: "12px",
              fill: "#3e6d91",
              fontWeight: "bold",
            }}
          />
          <Area
            baseLine={161.2}
            dataKey="close"
            stroke="#8CBAF5"
            fill="#D2E1F6"
          />
          <XAxis
            dataKey={"date"}
            tick={{ fontSize: "12px" }}
            tickFormatter={(d) => format(new Date(d), dateFormat)}
          />
          <YAxis
            orientation="right"
            width={40}
            type="number"
            domain={["auto", "auto"]}
            tick={{ fontSize: "12px" }}
            tickFormatter={(value) => Number(value.valueOf()).toFixed(2)}
          />
          <Tooltip
            formatter={(value) => Number(value.valueOf()).toFixed(2)}
            labelFormatter={(date) =>
              format(new Date(date), "MMM dd, yyyy HH:mm")
            }
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
