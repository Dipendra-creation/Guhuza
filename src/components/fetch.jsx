// src/pages/Play.jsx
import { useState, useEffect } from 'react';
import Quiz from '../components/Quiz/Quiz';

const Play = () => {
  const [level, setLevel] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch questions for the given level using async/await
  const fetchQuestions = async (currentLevel) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/quiz?level=${currentLevel}`);
      if (!response.ok) {
        throw new Error('Failed to fetch quiz data');
      }
      const data = await response.json();
      // Assuming your API returns an object with a "test" property that has a "question" array
      setQuestions(data.test.question);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // When the level changes, fetch new questions
  useEffect(() => {
    fetchQuestions(level);
  }, [level]);

  // Handler for moving to the next level
  const handleNextLevel = () => {
    setLevel((prevLevel) => prevLevel + 1);
  };

  // Render loading or error states if necessary
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Pass the questions and next level callback to the Quiz component
  return <Quiz questions={questions} onNextLevel={handleNextLevel} />;
};

export default Play;