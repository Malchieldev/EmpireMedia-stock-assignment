import { useState } from "react";

import { format, addHours, startOfDay, endOfDay, addYears } from "date-fns";

import { defaultQueryParams } from "@/utils/fetcher";

import Header from "@/components/layouts/Header";
import Tabs from "@/components/layouts/Tabs";
import TimeFrameSelector from "@/components/layouts/TimeFrameSelector";

import "@/styles/globals.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const { initialTickerData } = pageProps;

  const [queryParams, setQueryParams] = useState(defaultQueryParams);

  const oneMinuteHandler = () => {
    setQueryParams((prev) => ({
      ...prev,
      Period: 1,
      Precision: "Minutes",
      StartTime: format(startOfDay(new Date()), "MM/dd/yyyy"),
      EndTime: format(endOfDay(new Date()), "MM/dd/yyyy HH:mm"),
    }));
  };

  const fiveMinutesHandler = () => {
    setQueryParams((prev) => ({
      ...prev,
      Period: 5,
      Precision: "Minutes",
      StartTime: format(startOfDay(new Date()), "MM/dd/yyyy"),
      EndTime: format(endOfDay(new Date()), "MM/dd/yyyy HH:mm"),
    }));
  };

  const oneHourHandler = () => {
    setQueryParams((prev) => ({
      ...prev,
      Period: 1,
      Precision: "Hours",
      StartTime: format(addHours(new Date(), -24), "MM/dd/yyyy HH:mm"),
      EndTime: format(new Date(), "MM/dd/yyyy HH:mm"),
    }));
  };

  const oneWeekHandler = () => {
    setQueryParams((prev) => ({
      ...prev,
      Period: 24 * 7, //Week
      Precision: "Hours",
      StartTime: format(addYears(new Date(), -1), "MM/dd/yyyy HH:mm"),
      EndTime: format(new Date(), "MM/dd/yyyy HH:mm"),
    }));
  };

  return (
    <main>
      <Header initialData={initialTickerData} />
      <Tabs />
      <TimeFrameSelector
        oneMinuteHandler={oneMinuteHandler}
        fiveMinutesHandler={fiveMinutesHandler}
        oneHourHandler={oneHourHandler}
        oneWeekHandler={oneWeekHandler}
      />
      <Component {...pageProps} queryParams={queryParams} />
    </main>
  );
}
