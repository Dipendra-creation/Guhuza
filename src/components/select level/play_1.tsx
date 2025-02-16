import React, { useState, useEffect } from "react";
import "./play_1.css";
import Quiz from "../Quiz/Quiz";
import { FaLock, FaLockOpen } from "react-icons/fa";
import axios from "axios";

const MAX_LEVEL: number = 50;

const Play1: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [startQuiz, setStartQuiz] = useState<boolean>(false);

  // Fetch user's profile to determine the highest level completed.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5001/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          // Assume highestLevelCompleted is stored in the user profile (default 1)
          const highest = response.data.user.highestLevelCompleted || 1;
          // Unlock levels up to highestLevelCompleted + 1
          setUnlockedLevel(highest + 1);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, []);

  const fetchQuestions = async (level: number): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(`/api/quiz?level=${level}`);
      if (!response.ok) {
        throw new Error("Failed to fetch quiz data");
      }
      const data = await response.json();
      setQuestions(data.test.question);
      setStartQuiz(true); // Start the quiz after questions are loaded
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLevelSelect = (level: number): void => {
    // Only allow selection if the level is unlocked
    if (level <= unlockedLevel) {
      setSelectedLevel(level);
    }
  };

  const handleStartQuiz = (): void => {
    if (selectedLevel !== null) {
      fetchQuestions(selectedLevel);
    }
  };

  // When "Next Level" is clicked from the Quiz's result, we unlock the next level locally.
  const handleNextLevel = (): void => {
    if (selectedLevel !== null && selectedLevel < MAX_LEVEL) {
      const nextLevel = selectedLevel + 1;
      setUnlockedLevel((prev) => Math.max(prev, nextLevel));
      setSelectedLevel(nextLevel);
      fetchQuestions(nextLevel);
    }
  };

  if (startQuiz) {
    return (
      <Quiz
        questions={questions}
        onNextLevel={handleNextLevel}
        currentLevel={selectedLevel!}
        maxLevel={MAX_LEVEL}
      />
    );
  }

  return (
    <div className="play-container">
      <h2 className="header-title">Select a Quiz Level to Begin</h2>
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
                const isUnlocked = level <= unlockedLevel;
                return (
                  <button
                    key={level}
                    className={`level-button ${selectedLevel === level ? "selected" : ""}`}
                    onClick={() => handleLevelSelect(level)}
                    disabled={!isUnlocked}
                  >
                    {isUnlocked ? (
                      <FaLockOpen className="lock-icon" />
                    ) : (
                      <FaLock className="lock-icon" />
                    )}
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