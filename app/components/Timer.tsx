import React, {useEffect, useState} from 'react';
import styles from './Timer.css';
import Tomato from "./Tomato";
import startWav from '../../resources/sounds/timer_start.wav';
import stopWav from '../../resources/sounds/timer_stop.wav';
import finishWav from '../../resources/sounds/timer_finish.wav';
import notificationIcon from '../../resources/icons/notification.png';

interface Props {
  sessionLength: number;
  incrementPomodoros: () => void;
}

enum mode {
  standby = 'STANDBY',
  working = 'WORKING',
  break = 'BREAK',
  finishing = 'FINISHING'
}

const Timer: React.FC<Props> = ({sessionLength, incrementPomodoros}) => {
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [minutesLeft, setMinutesLeft] = useState<number>(0);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [timer, setTimer] = useState<number | null>(null);
  const [timerMode, setTimerMode] = useState<mode>(mode.standby);

  // timer sounds
  const soundStart:HTMLAudioElement = new Audio(startWav);
  const soundStop:HTMLAudioElement = new Audio(stopWav);
  const soundFinish:HTMLAudioElement = new Audio(finishWav);

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
    }

    const intervalId = setInterval(() => {

        setTotalSeconds(totalSeconds - 1);
        setSecondsLeft(calculateSecondsLeft());
        setMinutesLeft(calculateMinutesLeft());

        setTimerMode(mode.working);

        // change mode when there are 3 minutes left to display a different picture
        if (totalSeconds < 180 && timerMode !== mode.finishing) {
          setTimerMode(mode.finishing);
        }

        if (totalSeconds === 1) {
          soundFinish.play();
          new Notification('Pomodoro Timer', { body: 'Pomodoro has finished', icon: notificationIcon});
          setTimerMode(mode.standby);
          incrementPomodoros();
        }
    }, 1000);
    setTimer(intervalId);

    return () => clearInterval(intervalId);

  }, [totalSeconds]);

  const startTimer = (): void => {
    setTotalSeconds(sessionLength);
    soundStart.play();
    new Notification('Pomodoro Timer', { body: 'New pomodoro has started', icon: notificationIcon});

  };

  const stopTimer = (): void => {
    soundStop.play();
    clearInterval(timer);
    resetTimer();
    new Notification('Pomodoro Timer', { body: 'Timer has been interrupted', icon: notificationIcon});
    setTimerMode(mode.standby);
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
      <div className={styles.tomatoPicture}>
        <Tomato timerMode={timerMode} />
      </div>

      {timerMode === mode.working &&
        <div className={styles.timerDisplay}>{padNum(minutesLeft)}:{padNum(secondsLeft)}</div>
      }

      {timerMode === mode.standby &&
        <div className={styles.timerDisplay}>
          {padNum(Math.floor(sessionLength / 60))}:{padNum(sessionLength % 60)}
        </div>
      }

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
