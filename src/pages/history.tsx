import useSwr from "swr";
import fetcher, { defaultQueryParams } from "@/utils/fetcher";
import { format, endOfDay, startOfDay, parse } from "date-fns";

import Head from "next/head";
import History from "@/components/History";

const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "";
const chartUrl = process.env.NEXT_PUBLIC_CHART_API || "";

import type { TickerData, ChartData } from "@/types/types";

type HistoryPageProps = {
  initialChartData: ChartData[];
  initialTickerData: TickerData;
  queryParams: { [key: string]: any };
};

export default function HistoryPage(props: HistoryPageProps) {
  const { initialChartData, queryParams } = props;

  const { data: chartData } = useSwr([chartUrl, queryParams], fetcher, {
    fallbackData: initialChartData,
  });

  return (
    <>
      <Head>
        <title>{`${companyName} - History`}</title>
        <meta name="description" content="Stock data" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <History chartData={chartData} />
    </>
  );
}

export const getStaticProps = async () => {
  let initialTickerData = null;

  //ticker data:
  const queryParams = {
    ...defaultQueryParams,
    Period: 1,
    Precision: "Seconds",
  };

  const initialTickerDataRaw = await fetcher([chartUrl, queryParams]);
  const lastData = initialTickerDataRaw.slice(-1);

  if (lastData.length) {
    const open = lastData[0].open;
    const close = lastData[0].close;
    const change = close - open;
    const percentChange = 100 - (close / open) * 100;
    const lastUpdate = initialTickerDataRaw[0].date;

    initialTickerData = { last: close, change, percentChange, lastUpdate };
  }

  const initialChartData = await fetcher([chartUrl, defaultQueryParams]);

  return {
    props: {
      initialTickerData,
      initialChartData,
    },
  };
};
