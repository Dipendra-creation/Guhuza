// src/components/Play1.jsx
import "./play_1.css";
import { useState } from "react";
import Quiz from "../Quiz/Quiz";

const MAX_LEVEL = 50; // Define the maximum level

const Play1 = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startQuiz, setStartQuiz] = useState(false);

  // Function to fetch questions for a given level
  const fetchQuestions = async (level) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/quiz?level=${level}`);
      if (!response.ok) {
        throw new Error("Failed to fetch quiz data");
      }
      const data = await response.json();

      setQuestions(data.test.question);
      setStartQuiz(true); // Start the quiz
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle level selection
  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  // Start the quiz when the user clicks "Start Quiz"
  const handleStartQuiz = () => {
    if (selectedLevel) {
      fetchQuestions(selectedLevel);
    }
  };

  // Move to the next level manually (if not at the max level)
  const handleNextLevel = () => {
    if (selectedLevel < MAX_LEVEL) {
      const nextLevel = selectedLevel + 1;
      setSelectedLevel(nextLevel);
      fetchQuestions(nextLevel);
    }
  };

  // Render the Quiz component when the quiz starts
  if (startQuiz) {
    return (
      <Quiz
        questions={questions}
        onNextLevel={handleNextLevel}
        currentLevel={selectedLevel}
        hasNextLevel={selectedLevel < MAX_LEVEL}
      />
    );
  }

  return (
    <div className="play-container">
      <h2>Select a Quiz Level to Begin</h2>
      <div className="levels-grid">
        {[...Array(5)].map((_, categoryIndex) => {
          const categoryNames = [
            "Intern",
            "Associate",
            "Specialist",
            "Expert",
            "Master",
          ];
          const startLevel = categoryIndex * 10 + 1;
          return (
            <div key={categoryIndex} className="category-column">
              <div className="category-title">{categoryNames[categoryIndex]}</div>
              {Array.from({ length: 10 }, (_, i) => {
                const level = startLevel + i;
                return (
                  <button
                    key={level}
                    className={`level-button ${selectedLevel === level ? "selected" : ""}`}
                    onClick={() => handleLevelSelect(level)}
                  >
                    Level {level}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      <button
        className="start-button"
        onClick={handleStartQuiz}
        disabled={!selectedLevel || loading}
      >
        {loading ? "Loading..." : "Start Quiz"}
      </button>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Play1;