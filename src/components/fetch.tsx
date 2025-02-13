import React, { useState, useEffect } from "react";
import Quiz from "./Quiz/Quiz";
import "./fetch.css"; // Import the CSS for spinner and error styles

// Define the shape of a question (customize these fields as needed)
interface Question {
  question: string;
  test_answer: number;
  answers: string[];
  // Add any additional properties based on your API response
}

// A simple spinner component using a CSS animation
const Spinner: React.FC = () => (
  <div className="spinner">
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <p>Loading quiz data...</p>
  </div>
);

const Play: React.FC = (): JSX.Element => {
  const [level, setLevel] = useState<number>(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const MAX_LEVEL: number = 50;

  const fetchQuestions = async (currentLevel: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/quiz?level=${currentLevel}`);
      if (!response.ok) {
        throw new Error("Failed to fetch quiz data");
      }
      const data = await response.json();
      // Assuming the API returns data in the shape: { test: { question: Question[] } }
      setQuestions(data.test.question);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions(level);
  }, [level]);

  const handleNextLevel = (): void => {
    setLevel((prevLevel) => prevLevel + 1);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Oops, something went wrong: {error}</p>
        <button onClick={() => fetchQuestions(level)}>Try Again</button>
      </div>
    );
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
