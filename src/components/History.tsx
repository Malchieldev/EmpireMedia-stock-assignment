import React, { useState } from "react";
import _ from "lodash";
import { format } from "date-fns";

import styled from "@/styles/History.module.css";

const getOrder = (order?: string): "asc" | "desc" => {
  return order === "asc" ? "desc" : "asc";
};

const columns = ["Date", "High", "Low", "Open", "Close", "Change"] as const;

import type { ChartData } from "@/types/types";

interface SortedData extends ChartData {
  change: number;
}
type HistoryProps = {
  chartData: ChartData[];
};

export default function History(props: HistoryProps) {
  const { chartData } = props;

  const [sortParams, setSortParams] = useState<{
    field: typeof columns[number];
    order: "asc" | "desc";
  }>({
    field: "Date",
    order: "desc",
  });

  const sortedData = _.orderBy(
    chartData.map((el) => {
      return { ...el, change: 100 - (el.open / el.close) * 100 };
    }),
    _.camelCase(sortParams.field),
    sortParams.order
  ) as SortedData[];

  const sortHandler = (index: number) => {
    setSortParams((prev) => {
      return { field: columns[index], order: getOrder(prev.order) };
    });
  };

  return (
    <div className={styled.history}>
      <table>
        <tbody>
          <tr>
            {columns.map((el, i) => {
              const isActiveField = sortParams.field === el;
              return (
                <th key={`th-column-${el}`}>
                  <div>
                    <span>{el}</span>
                    <button onClick={() => sortHandler(i)}>
                      <div className={styled["sort-group"]}>
                        <i
                          className={`${styled.arrow} ${styled.up} ${
                            isActiveField &&
                            sortParams.order === "asc" &&
                            styled["up-active"]
                          }`}
                        ></i>
                        <i
                          className={`${styled.arrow} ${styled.down} ${
                            isActiveField &&
                            sortParams.order === "desc" &&
                            styled["down-active"]
                          }`}
                        ></i>
                      </div>
                    </button>
                  </div>
                </th>
              );
            })}
          </tr>
          {sortedData.map((el, i) => {
            return (
              <tr key={`history-tr-${i}`}>
                <td>{format(new Date(el.date), "MMM dd, yyyy HH:mm")}</td>
                <td>{el.high.toFixed(2)}</td>
                <td>{el.low.toFixed(2)}</td>
                <td>{el.open.toFixed(2)}</td>
                <td>{el.close.toFixed(2)}</td>
                <td style={{ color: el.change > 0 ? "green" : "red" }}>
                  {`${el.change.toFixed(2)}%`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
