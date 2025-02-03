import './AnswerTimer.css';
import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

function AnswerTimer({ duration, onTimeUp }) {
    const [counter, setCounter] = useState(0);
    const [progressLoaded, setProgressLoaded] = useState(0);
    const intervalRef = useRef();

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCounter((cur) => cur + 1);
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        setProgressLoaded(100 * (counter / duration));

        if (counter === duration) {
            clearInterval(intervalRef.current);

            setTimeout(() => {
                onTimeUp();
            }, 1000);
        }

    }, [counter, duration, onTimeUp]);


    return (
        <div className='answer-timer-container'>
            <div style={{
                width: `${progressLoaded}%`,
                backgroundColor:
                    progressLoaded < 60
                        ? 'lightgreen'
                        : progressLoaded < 80
                            ? 'orange'
                            : 'red'
            }}
                className='progress'></div>
        </div>
    );

}

AnswerTimer.propTypes = {
    duration: PropTypes.number.isRequired,
    onTimeUp: PropTypes.func.isRequired,
};

export default AnswerTimer;