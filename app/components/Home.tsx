import React, { useState } from 'react';
import styles from './Home.css';
import Timer from './Timer';

export default function Home(): JSX.Element {
  const [sessionLengthInSeconds] = useState<number>(25 * 60);
  const [pomodoros, setPomodoros] = useState<number>(0);

  const incrementPomodoros = () => {
    setPomodoros(pomodoros+1);
  };

  return (
    <div className={styles.container} data-tid="container">
      <Timer
          sessionLength={sessionLengthInSeconds}
          incrementPomodoros={incrementPomodoros}
      />
      <div className={styles.pomodoroCounter}>Pomodoros completed: {pomodoros}</div>
    </div>
  );
}
