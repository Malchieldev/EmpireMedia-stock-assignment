import useSWRSubscription from "swr/subscription";
import type { SWRSubscription } from "swr/subscription";

import type { TickerData } from "@/types/types";

const url = process.env.NEXT_PUBLIC_SOCKET_URL || "";
const token = process.env.NEXT_PUBLIC_SOCKET_TOKEN || "";

const subscribeFc: SWRSubscription<string, TickerData, Error> = (
  key,
  { next }
) => {
  const socket = new WebSocket(`${url}?token=${token}`);

  const onOpenHandler = () => {
    const subsribeParams = JSON.stringify({
      type: "SUBSCRIBE",
      instruments: [key],
    });
    socket.send(subsribeParams);
  };

  const onMessageHandler = (event: MessageEvent) =>
    next(null, JSON.parse(event.data)[key]);

  socket.onopen = onOpenHandler;
  socket.addEventListener("message", onMessageHandler);

  return () => {
    socket.removeEventListener("message", onMessageHandler);
    socket.close();
  };
};

export default function useSocketData(initialData: TickerData, ticker: string) {
  const { data } = useSWRSubscription(ticker, subscribeFc, {
    fallbackData: initialData,
  });

  return data;
}
