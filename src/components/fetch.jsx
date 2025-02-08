// src/pages/Play.jsx
import { useState, useEffect } from "react";
import Quiz from "../components/Quiz/Quiz";

const Play = () => {
  const [level, setLevel] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const MAX_LEVEL = 50;

  const fetchQuestions = async (currentLevel) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/quiz?level=${currentLevel}`);
      if (!response.ok) {
        throw new Error("Failed to fetch quiz data");
      }
      const data = await response.json();
      setQuestions(data.test.question);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions(level);
  }, [level]);

  const handleNextLevel = () => {
    setLevel((prevLevel) => prevLevel + 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Quiz
      questions={questions}
      onNextLevel={handleNextLevel}
      currentLevel={level}
      maxLevel={MAX_LEVEL}
    />
  );
};

export default Play;