import useSocketData from "@/hooks/useSocketData";
import format from "date-fns/format";

import LoadingSpinner from "../UI/LoadingSpinner";

import styled from "@/styles/Header.module.css";

const ticker = process.env.NEXT_PUBLIC_COMPANY_TICKER || "";
const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "";

import type { TickerData } from "@/types/types";

type HeaderProps = {
  initialData: TickerData;
};

export default function Header(props: HeaderProps) {
  const { initialData } = props;

  const tickerData = useSocketData(initialData, `s-${ticker}`);
  if (!tickerData) {
    return (
      <header style={{ display: "flex" }}>
        <LoadingSpinner pixelSize={100} />
      </header>
    );
  }

  const {
    last: priceRaw,
    change: changeRaw,
    percentChange: percentChangeRaw,
    lastUpdate,
  } = tickerData;

  const coloredClassName = changeRaw > 0 ? styled.green : styled.red;

  const price = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(priceRaw);

  const change = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: "exceptZero",
  }).format(changeRaw);

  const percentChange = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: "exceptZero",
  }).format(percentChangeRaw / 100);

  const timeZoneOffSet = new Date(lastUpdate).getTimezoneOffset() * 60000;

  const date = format(new Date(lastUpdate).getTime() - timeZoneOffSet, "MMM dd, yyyy HH:mm");

  return (
    <header className={styled.hdr}>
      <div className={styled["hdr-content"]}>
        <div className={styled.title}>
          <h1>{companyName}</h1>
          <p>{`As of: ${date}`}</p>
        </div>
        <div>
          <div className={styled["price-content"]}>
            <span className={`${styled.arrow} ${coloredClassName}`}></span>
            <span className={styled.price}>{price}</span>
          </div>
          <span
            className={coloredClassName}
          >{`${change} (${percentChange})`}</span>
        </div>
      </div>
    </header>
  );
}
