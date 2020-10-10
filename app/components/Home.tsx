import React, { useState } from 'react';
import styles from './Home.css';
import Timer from './Timer';

interface Settings {
    pomodoroLength: number;
    shortBreakLength: number;
    longBreakLength: number;
}

export default function Home(): JSX.Element {
  const [sessionLengthInSeconds, setSessionLength] = useState<number>(25 * 60);
  const [pomodoros, setPomodoros] = useState<number>(0);

  const settings: Settings = {
      pomodoroLength: 25 * 60,
      shortBreakLength: 5 * 60,
      longBreakLength: 15 * 60
  }

  const incrementPomodoros = () => {
    setPomodoros(pomodoros+1);
  };

  const selectSessionLength = (seconds: number) => {
    setSessionLength(seconds);
  }

  return (
    <div className={styles.container} data-tid="container">
      <Timer
          sessionLength={sessionLengthInSeconds}
          incrementPomodoros={incrementPomodoros}
      />
      <div className={styles.sessionOptions}>
          <a onClick={() => selectSessionLength(settings.pomodoroLength)}>Pomodoro</a> |
          <a onClick={() => selectSessionLength(settings.shortBreakLength)}>Short Break</a> |
          <a onClick={() => selectSessionLength(settings.longBreakLength)}>Long Break</a>
      </div>

      <div className={styles.pomodoroCounter}>Pomodoros completed: {pomodoros}</div>
    </div>
  );
}
