import React, { FC } from "react";
import { Button, Card, Icon, Statistic } from "semantic-ui-react";

import "../App.css";

interface AppProps {
  timeLeft: number;
  timerState: "ticking" | "paused";
  toggleTimerState: () => void;
  reset: () => void;
}

const AppComponent: FC<AppProps> = ({
  timeLeft,
  timerState,
  toggleTimerState,
  reset,
}) => (
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

export default AppComponent;
