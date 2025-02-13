import React, { useEffect, useState, useRef } from 'react';
import './AnswerTimer.css';

interface AnswerTimerProps {
  duration: number;
  onTimeUp: () => void;
}

const AnswerTimer: React.FC<AnswerTimerProps> = ({ duration, onTimeUp }) => {
  const [counter, setCounter] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((cur) => cur + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (counter === duration) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        onTimeUp();
      }, 1000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [counter, duration, onTimeUp]);

  // Calculate progress on the fly
  const progressLoaded = 100 * (counter / duration);

  return (
    <div className="answer-timer-container">
      <div
        style={{
          width: `${progressLoaded}%`,
          backgroundColor:
            progressLoaded < 60
              ? 'lightgreen'
              : progressLoaded < 80
              ? 'orange'
              : 'red',
        }}
        className="progress"
      ></div>
    </div>
  );
};

export default AnswerTimer;
