import { useEffect, useState, useCallback } from "react";
import moment from "moment";

const useTimer = (callback: (elapsedTime: number) => void) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [initTime, setInitTime] = useState(Date.now());
  const [stopped, setStopped] = useState(false);

  const start = useCallback(() => {
    setStopped(false);
    setIsActive(true);
    setInitTime(Date.now() - elapsedTime);
  }, [elapsedTime]);

  const pause = useCallback(() => {
    setIsActive(false);
  }, []);

  const reset = useCallback(() => {
    setInitTime(Date.now());
    setElapsedTime(0);
    setIsActive(false);
    callback(0);
  }, []);

  const stop = useCallback(() => {
    reset();
    setStopped(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive) {
        const timeDiff = Date.now() - initTime;
        setElapsedTime(timeDiff);
        callback(timeDiff);
      }
    }, 1000 / 60);

    if (stopped) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, initTime, stopped]);

  return { elapsedTime, start, pause, stop, isActive };
};

const durationToMoment = (duration: number) => moment.duration(duration);
const momentToTime = (mm: moment.Duration) => [mm.hours(), mm.minutes(), mm.seconds()];
const formatTime = (time: number[]) => time.map(item => item.toString().padStart(2, "0")).join(":");
const durationToTime = (ms: number) => formatTime(momentToTime(durationToMoment(ms)));

export { useTimer, durationToTime };
