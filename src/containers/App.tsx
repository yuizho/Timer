import React, { FC, useEffect, useState } from "react";

import AppComponent from "../components/App";

interface AppProps {
  timeLeft: number;
  timerState: "ticking" | "paused";
  toggleTimerState: () => void;
  reset: () => void;
}

const useTimer = (limitSec: number): AppProps => {
  const [timeLeft, setTimeLeft] = useState(limitSec);
  const [timerState, setTimerState] = useState("ticking");
  // https://www.carlrippon.com/typed-usestate-with-typescript/
  const [timerId, setTimerId] = useState<NodeJS.Timer | null>(null);

  const pause = () => {
    clearInterval(timerId as NodeJS.Timer);
    setTimerState("paused");
  };

  const resume = () => {
    setTimerId(setInterval(tick, 1000));
    setTimerState("ticking");
  };

  const tick = () => {
    console.log("tick is called");
    setTimeLeft((prevTime) => {
      if (prevTime === 0) {
        pause();
        return 0;
      } else {
        return prevTime - 1;
      }
    });
  };

  useEffect(() => {
    setTimerId(setInterval(tick, 1000));

    return clearInterval(timerId as NodeJS.Timer);
  }, []);

  return {
    timeLeft: timeLeft,
    timerState: timerState as "ticking" | "paused",
    toggleTimerState: () => {
      if (timerState === "ticking") {
        pause();
      } else {
        resume();
      }
    },
    reset: () => {
      setTimeLeft(limitSec);
      pause();
    },
  };
};

const AppContainer: FC = () => {
  const LIMIT = 60;
  const props = useTimer(LIMIT);

  // pass the properties of the object  by spread attributes
  return <AppComponent {...props} />;
};

export default AppContainer;
