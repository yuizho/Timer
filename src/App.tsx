import React, { Component } from "react";
import { Button, Card, Icon, Statistic } from "semantic-ui-react";
import "./App.css";

const LIMIT = 60;

interface AppState {
  timeLeft: number;
  timerState: "ticking" | "paused";
}

class App extends Component<{}, AppState> {
  timerId?: NodeJS.Timer;

  constructor(props: {}) {
    super(props);
    this.state = { timeLeft: LIMIT, timerState: "ticking" };
  }

  reset = () => {
    this.setState({ timeLeft: LIMIT });
  };

  pause = () => {
    clearInterval(this.timerId as NodeJS.Timer);
    this.setState({ timerState: "paused" });
  };

  resume = () => {
    this.timerId = setInterval(this.tick, 1000);
    this.setState({ timerState: "ticking" });
  };

  toggleTimerState = () => {
    if (this.state.timerState === "ticking") {
      this.pause();
    } else {
      this.resume();
    }
  };

  tick = () => {
    const { timeLeft } = this.state;
    if (timeLeft === 0) {
      this.pause();
      return;
    }
    this.setState((prevState) => ({
      timeLeft: prevState.timeLeft - 1,
    }));
  };

  componentDidMount = () => {
    this.timerId = setInterval(this.tick, 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.timerId as NodeJS.Timer);
  };

  render() {
    const { timeLeft, timerState } = this.state;
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
            <Button color="blue" fluid onClick={this.toggleTimerState}>
              {timerState === "ticking" ? (
                <Icon name="pause" />
              ) : (
                <Icon name="play" />
              )}
            </Button>
            <br />
            <Button color="red" fluid onClick={this.reset}>
              <Icon name="redo" />
            </Button>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default App;
