import './AnswerTimer.css';
import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

function AnswerTimer({ duration, onTimeUp }) {
  const [counter, setCounter] = useState(0);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((cur) => cur + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (counter === duration) {
      clearInterval(intervalRef.current);

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
              : 'red'
        }}
        className="progress"
      ></div>
    </div>
  );
}

AnswerTimer.propTypes = {
  duration: PropTypes.number.isRequired,
  onTimeUp: PropTypes.func.isRequired,
};

export default AnswerTimer;