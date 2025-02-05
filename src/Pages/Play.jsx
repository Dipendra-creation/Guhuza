import { useState, useEffect } from 'react';
import Quiz from '../components/Quiz/Quiz';

const Play = () => {
  const [level, setLevel] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch questions based on the current level
  const fetchQuestions = (currentLevel) => {
    setLoading(true);
    fetch(`/api/quiz?level=${currentLevel}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }
        return response.json();
      })
      .then((data) => {
        // Assuming API returns an object with a test property containing the questions array
        setQuestions(data.test.question);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  // Fetch questions whenever the level changes
  useEffect(() => {
    fetchQuestions(level);
  }, [level]);

  // Handler for moving to the next level
  const handleNextLevel = () => {
    setLevel((prevLevel) => prevLevel + 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Pass the onNextLevel callback to the Quiz component
  return <Quiz questions={questions} onNextLevel={handleNextLevel} />;
};

export default Play;