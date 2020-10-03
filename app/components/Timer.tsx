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

  // timer sounds
  const soundStart:HTMLAudioElement = new Audio('../resources/sounds/timer_start.wav');
  const soundStop:HTMLAudioElement = new Audio('../resources/sounds/timer_stop.wav');
  const soundFinish:HTMLAudioElement = new Audio('../resources/sounds/timer_finish.wav');

  const calculateMinutesLeft = (): number => {
    return Math.floor(totalSeconds / 60);
  };

  const calculateSecondsLeft = (): number => {
    return totalSeconds % 60;
  };

  useEffect(() => {
    if (!totalSeconds) {
      resetTimer();
      return;
    };

    const intervalId = setInterval(() => {
        setTotalSeconds(totalSeconds - 1);
        setSecondsLeft(calculateSecondsLeft());
        setMinutesLeft(calculateMinutesLeft());
        if (totalSeconds === 1) {
          soundFinish.play();
          new Notification('Pomodoro Timer', { body: 'Pomodoro has finished'});
        }
    }, 1000);
    setTimer(intervalId);

    return () => clearInterval(intervalId);

  }, [totalSeconds]);

  const startTimer = (): void => {
    setTotalSeconds(sessionLength);
    soundStart.play();
    new Notification('Pomodoro Timer', { body: 'New pomodoro has started'});
  };

  const stopTimer = (): void => {
    soundStop.play();
    clearInterval(timer);
    resetTimer();
    new Notification('Pomodoro Timer', { body: 'Timer has been interrupted'});
  };

  const resetTimer = (): void => {
    setTotalSeconds(0);
    setSecondsLeft(0);
    setMinutesLeft(0);
  }

  const padNum = (num: number): string => {
    return (num < 10 ? '0' : '') + num.toString();
  };

  return (
    <div>
      <div className={styles.timerDisplay}>{padNum(minutesLeft)}:{padNum(secondsLeft)}</div>
      <span className={styles.timerButton}>
        <i onClick={startTimer} className="far fa-play-circle"></i>
      </span>
      <span className={styles.timerButton}>
        <i onClick={stopTimer} className="far fa-stop-circle"></i>
      </span>
    </div>
  );
};
export default Timer;
