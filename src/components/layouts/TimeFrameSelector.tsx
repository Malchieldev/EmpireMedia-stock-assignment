import { useState } from "react";

import styled from "@/styles/TimeFrameSelectio.module.css";

const frames = ["1 Minute", "5 Minutes", "1 Hour", "1 Week"] as const;

type TimeFrameSelectorProps = {
  oneMinuteHandler: Function;
  fiveMinutesHandler: Function;
  oneHourHandler: Function;
  oneWeekHandler: Function;
};

export default function TimeFrameSelector(props: TimeFrameSelectorProps) {
  const {
    oneMinuteHandler,
    fiveMinutesHandler,
    oneHourHandler,
    oneWeekHandler,
  } = props;

  const [frame, setFrame] = useState<typeof frames[number]>("1 Minute");

  const frameClickHandler = (index: number) => {
    const newFrame = frames[index];

    switch (newFrame) {
      case "1 Minute":
        oneMinuteHandler();
        break;
      case "5 Minutes":
        fiveMinutesHandler();
        break;
      case "1 Hour":
        oneHourHandler();
        break;
      case "1 Week":
        oneWeekHandler();
        break;
    }
    setFrame(newFrame);
  };

  return (
    <div>
      {frames.map((el, i) => (
        <button
          key={`btn-frame-${i}`}
          className={`${styled.btn} ${frame === el ? styled.active : ""}`}
          onClick={() => {
            frameClickHandler(i);
          }}
        >
          {el}
        </button>
      ))}
    </div>
  );
}
