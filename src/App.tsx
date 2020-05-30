import React, { FC, useEffect, useState } from "react";
import { Button, Card, Icon, Statistic } from "semantic-ui-react";
import "./App.css";

const LIMIT = 60;

interface AppState {
  timeLeft: number;
  timerState: "ticking" | "paused";
}

const App: FC = () => {
  const [timeLeft, setTimeLeft] = useState(LIMIT);
  const [timerState, setTimerState] = useState("ticking");
  // https://www.carlrippon.com/typed-usestate-with-typescript/
  const [timerId, setTimerId] = useState<NodeJS.Timer | null>(null);

  //const timerId?: NodeJS.Timer = nu;

  const reset = () => {
    setTimeLeft(LIMIT);
    pause();
  };

  const pause = () => {
    clearInterval(timerId as NodeJS.Timer);
    setTimerState("paused");
  };

  const resume = () => {
    setTimerId(setInterval(tick, 1000));
    setTimerState("ticking");
  };

  const toggleTimerState = () => {
    if (timerState === "ticking") {
      pause();
    } else {
      resume();
    }
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

  return (
    <div className="number-board">
      <header>
        <h1>Timer</h1>
      </header>
      <Card>
        <Statistic className="number-board">
          <Statistic.Label>timer</Statistic.Label>
          <Statistic.Value>{timeLeft}</Statistic.Value>
        </Statistic>
        <Card.Content>
          <Button color="blue" fluid onClick={toggleTimerState}>
            {timerState === "ticking" ? (
              <Icon name="pause" />
            ) : (
              <Icon name="play" />
            )}
          </Button>
          <br />
          <Button color="red" fluid onClick={reset}>
            <Icon name="redo" />
          </Button>
        </Card.Content>
      </Card>
    </div>
  );
};

export default App;
