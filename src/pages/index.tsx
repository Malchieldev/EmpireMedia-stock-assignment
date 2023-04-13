import useSwr from "swr";

import fetcher, { defaultQueryParams } from "@/utils/fetcher";

import Head from "next/head";
import Overview from "@/components/Overview";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "";
const chartUrl = process.env.NEXT_PUBLIC_CHART_API || "";

import type { TickerData } from "@/types/types";

type HomeProps = {
  initialTickerData: TickerData;
  queryParams: { [key: string]: any };
};

export default function Home(props: HomeProps) {
  const { queryParams } = props;

  const { data: chartData } = useSwr([chartUrl, queryParams], fetcher, {
    revalidateOnFocus: false,
  });

  if (!chartData) {
    return (
      <div style={{ display: "flex", height: "400px", alignItems: "center" }}>
        <LoadingSpinner pixelSize={150} />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`${companyName} - Stock`}</title>
        <meta name="description" content="Stock data" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Overview chartData={chartData} />
    </>
  );
}

export const getStaticProps = async () => {
  let initialTickerData = null;

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

  return {
    props: {
      initialTickerData,
    },
  };
};
