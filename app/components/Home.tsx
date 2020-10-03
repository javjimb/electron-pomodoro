import React, { useState } from 'react';
import styles from './Home.css';
import Timer from './Timer';

export default function Home(): JSX.Element {
  const [sessionLengthInSeconds] = useState<number>(25 * 60);

  return (
    <div className={styles.container} data-tid="container">
      <Timer sessionLength={sessionLengthInSeconds} />
    </div>
  );
}
