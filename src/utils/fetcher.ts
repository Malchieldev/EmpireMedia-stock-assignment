import { Fetcher } from "swr";
import { parse } from "date-fns";
import axios from "axios";
import { format, startOfDay, endOfDay } from "date-fns";

import { ChartData } from "@/types/types";

const ticker = process.env.NEXT_PUBLIC_COMPANY_TICKER || "";

const defaultQueryParams = {
  Identifier: `${ticker.toUpperCase()}.XNAS`,
  IdentifierType: "Symbol",
  AdjustmentMethod: "All",
  IncludeExtended: false,
  _fields:
    "ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume",
  Period: 1,
  Precision: "Minutes",
  StartTime: format(startOfDay(new Date()), "MM/dd/yyyy"),
  EndTime: format(endOfDay(new Date()), "MM/dd/yyyy HH:mm"),
};

const fetcher: Fetcher<ChartData[], [string, { [key: string]: any }]> = async (
  params
) => {
  const [url, queryParams] = params;

  const response = await axios.get(url, {
    params: queryParams,
  });

  const data = response.data.map((el: { [key: string]: any }) => {
    const date = parse(el.Date, "yyyy/MM/dd HH:mm:ss", new Date()).toString();

    return {
      date,
      high: el.High,
      low: el.Low,
      open: el.Open,
      close: el.Close,
    };
  });

  return data;
};

export { defaultQueryParams };
export default fetcher;
