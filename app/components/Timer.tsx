import React, {useEffect, useState} from 'react';
import styles from './Timer.css';

interface Props {
  sessionLength: number;
}

const Timer: React.FC<Props> = ({sessionLength}) => {
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [minutesLeft, setMinutesLeft] = useState<number>(0);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [timer, setTimer] = useState<number | null>(null);

  const calculateMinutesLeft = (): number => {
    return Math.floor(totalSeconds / 60);
  };

  const calculateSecondsLeft = (): number => {
    return totalSeconds % 60;
  };

  useEffect(() => {
    if (!totalSeconds) return;

    const intervalId = setInterval(() => {
        console.log(totalSeconds);
        setTotalSeconds(totalSeconds - 1);
        setSecondsLeft(calculateSecondsLeft());
        setMinutesLeft(calculateMinutesLeft());
    }, 1000);
    setTimer(intervalId);

    return () => clearInterval(intervalId);
  }, [totalSeconds]);

  const startTimer = (): void => {
    setTotalSeconds(sessionLength);
  };

  const stopTimer = (): void => {
    clearInterval(timer);
    setTotalSeconds(0);
    setSecondsLeft(0);
    setMinutesLeft(0);
  };

  const padNum = (num: number): string => {
    return (num < 10 ? '0' : '') + num.toString();
  };

  return (
    <div>
      <h2>{padNum(minutesLeft)}:{padNum(secondsLeft)}</h2>
      <a onClick={startTimer} className={styles.toolbarButton}>Start</a>
      <a onClick={stopTimer} className={styles.toolbarButton}>Stop</a>
    </div>
  );
};
export default Timer;
