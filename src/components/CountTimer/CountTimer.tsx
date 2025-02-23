import React, { useState, useEffect } from 'react';
import './CountTimer.css';

type CountTimerProps = {
  duration?: number;
  onTimeUp?: () => void;
};

const CountTimer: React.FC<CountTimerProps> = ({ duration = 10, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, onTimeUp]);

  return (
    <div className="count-timer">
      <span className="time-text">{timeLeft}</span>
    </div>
  );
};

export default CountTimer;
