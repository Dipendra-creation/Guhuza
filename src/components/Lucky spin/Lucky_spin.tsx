import React, { useState, useRef } from 'react';
import './Lucky_spin.css';

const prizes: number[] = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200];
const SEGMENT_COUNT = prizes.length;
const SEGMENT_ANGLE = 360 / SEGMENT_COUNT;

const LuckyDrawWheel: React.FC = () => {
  const [spinning, setSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);

    // Random spin duration between 4000ms and 6000ms
    const spinDuration = Math.floor(Math.random() * (6000 - 4000 + 1)) + 4000;

    // Update the wheel's transition style with the random duration
    if (wheelRef.current) {
      wheelRef.current.style.transition = `transform ${spinDuration}ms cubic-bezier(0.33, 1, 0.68, 1)`;
    }

    // Randomly select a prize index (0 to SEGMENT_COUNT - 1)
    const prizeIndex = Math.floor(Math.random() * SEGMENT_COUNT);
    // Add between 5 and 7 full spins for dramatic effect
    const fullSpins = Math.floor(Math.random() * 3) + 5;
    // Calculate final rotation so that the winning segment aligns with the pointer
    const finalRotation =
      fullSpins * 360 + (360 - (prizeIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2));
    setRotation(finalRotation);

    // After the spin duration, display the result
    setTimeout(() => {
      setSpinning(false);
      setResult(prizes[prizeIndex]);
    }, spinDuration);
  };

  return (
    <div className="lucky-draw-container">
      <div className="wheel-container">
        <div
          className="wheel"
          ref={wheelRef}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Render each prize label positioned along the circular path */}
          {prizes.map((prize, index) => {
            const rotationAngle = index * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
            return (
              <div
                key={index}
                className="wheel-label"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${rotationAngle}deg) translate(0, -120px) rotate(-${rotationAngle}deg)`,
                }}
              >
                {prize} GP
              </div>
            );
          })}
        </div>
        <div className="pointer"></div>
      </div>
      <button onClick={spinWheel} disabled={spinning}>
        {spinning ? 'Spinning...' : 'Spin'}
      </button>
      {result !== null && !spinning && (
        <div className="result">You won {result} GP!</div>
      )}
    </div>
  );
};

export default LuckyDrawWheel;
