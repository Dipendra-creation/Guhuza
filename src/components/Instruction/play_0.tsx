import React, { useState } from "react";
import "./play_0.css";
import Play1 from "../select level/play_1";

const Play0: React.FC = () => {
  const [startGame, setStartGame] = useState<boolean>(false);

  const handleStartGame = (): void => {
    setStartGame(true);
  };

  if (startGame) {
    return <Play1 />;
  }

  return (
    <div className="instructions-container">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1 className="header-title">Welcome to Guhuza Quiz</h1>
        <p className="intro-text">
          Guhuza is an interactive and engaging quiz game that simulates the real-world job-seeking experience. Progress through different levels, test your knowledge, and compete for the top position on the leaderboard.
        </p>
      </div>

      {/* Instructions Section */}
      <h2 className="header-subtitle">Game Instructions</h2>
      <div className="instructions-box">
        <ol className="instructions-list">
          <li>
            <strong>Starting the Game:</strong> Click on the <b>"Play"</b> button on the home screen to begin the quiz.
          </li>
          <li>
            <strong>Answering Questions:</strong> Each question has multiple-choice answers. Click on the correct option before the timer runs out. After selecting an answer, click <b>"Next"</b> to move to the next question.
          </li>
          <li>
            <strong>Scoring System:</strong>
            <ul className="sub-list">
              <li>Correct Answer: <b>+10 points</b></li>
              <li>Wrong Answer: <b>-5 points</b></li>
              <li>Unanswered (Time Out): <b>-5 points</b></li>
            </ul>
          </li>
          <li>
            <strong>Timer System:</strong> Each question has a <b>10-second</b> countdown. If no answer is selected within the time, it will be considered incorrect.
          </li>
          <li>
            <strong>Completing a Level:</strong> Each level consists of <b>10 questions</b>. After completing all questions, you will receive a score summary.
          </li>
          <li>
            <strong>Advancing to the Next Level:</strong> After completing a level, click <b>"Next Level"</b> to continue. The game progresses up to <b>Level 50</b>.
          </li>
          <li>
            <strong>Leaderboard:</strong> Track your ranking and total score in the <b>Leaderboard</b> section to see how you compare with other players.
          </li>
          <li>
            <strong>Profile & Progress:</strong> Your completed levels, scores, and progress are stored in the <b>Profile</b> section for future reference.
          </li>
          <li>
            <strong>Troubleshooting:</strong>
            <ul className="sub-list">
              <li>If the game does not load, refresh the page.</li>
              <li>Ensure a stable internet connection.</li>
              <li>Check the <b>Leaderboard</b> if the quiz is temporarily unavailable.</li>
            </ul>
          </li>
        </ol>
      </div>

      {/* Start Button */}
      <div className="button-container">
        <button className="play-button" onClick={handleStartGame}>
          Start Playing
        </button>
      </div>
    </div>
  );
};

export default Play0;
