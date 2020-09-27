import React, { useState } from 'react';
import styles from './Home.css';
import Timer from './Timer';
import Tomate from '../../resources/images/tomate.png';

export default function Home(): JSX.Element {
  const [sessionLengthInSeconds] = useState<number>(25 * 60);

  return (
    <div className={styles.container} data-tid="container">
      <img src={Tomate} />
      <h2>Pomodoro Timer</h2>
      <Timer sessionLength={sessionLengthInSeconds} />
    </div>
  );
}
