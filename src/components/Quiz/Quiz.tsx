import React, { useState } from "react";
import { resultInitialState } from "../../constants";
import "./Quiz.css";
import AnswerTimer from "../AnswerTimer/AnswerTimer";
import axios from "axios";

interface Question {
  question: string;
  test_answer: number;
  answers: string[];
}

interface QuizResult {
  GP: number;
  correctAnswers: number;
  wrongAnswers: number;
}

interface QuizProps {
  questions: Question[];
  onNextLevel: () => void;
  currentLevel: number;
  maxLevel: number;
}

const Quiz: React.FC<QuizProps> = ({ questions, onNextLevel, currentLevel, maxLevel }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answerIdx, setAnswerIdx] = useState<number | null>(null);
  const [result, setResult] = useState<QuizResult>(resultInitialState);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isUpdatingScore, setIsUpdatingScore] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const hasNextLevel = currentLevel < maxLevel;
  const { question, test_answer, answers } = questions[currentQuestion];

  const onAnswerClick = (answer: string, index: number): void => {
    setAnswerIdx(index);
  };

  // This function calculates delta values for each question, updates local state,
  // and sends the delta values to the backend so that the user's score is incremented.
  const onClickNext = async (finalAnswer: boolean): Promise<void> => {
    // Calculate delta values for the current question:
    const deltaGP = finalAnswer ? 10 : -5;
    const deltaCorrect = finalAnswer ? 1 : 0;
    const deltaWrong = finalAnswer ? 0 : 1;

    // Update local result state immediately for user feedback:
    setResult((prev) => ({
      ...prev,
      GP: prev.GP + deltaGP,
      correctAnswers: prev.correctAnswers + deltaCorrect,
      wrongAnswers: prev.wrongAnswers + deltaWrong,
    }));

    // Update the user's score in the backend:
    await updateUserScore(deltaGP, deltaCorrect, deltaWrong);

    // Move to the next question or, if it was the last question, show the result:
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
    setAnswerIdx(null);
  };

  // Function to send delta values to the backend so that the existing score is incremented.
  const updateUserScore = async (
    deltaGP: number,
    deltaCorrect: number,
    deltaWrong: number
  ) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      setIsUpdatingScore(true);
      setUpdateError(null);
      await axios.put(
        "http://localhost:5001/api/auth/update-score",
        {
          deltaGP,
          deltaCorrect,
          deltaWrong,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Error updating user score:", error);
      setUpdateError("Unable to update score, please try again.");
    } finally {
      setIsUpdatingScore(false);
    }
  };

  const onTryAgain = (): void => {
    setCurrentQuestion(0);
    setAnswerIdx(null);
    setResult(resultInitialState);
    setShowResult(false);
    setUpdateError(null);
  };

  const handleNextLevel = async (): Promise<void> => {
    // Optionally, you can update the score again at level end if needed.
    // For now, we assume every question updates the score.
    onNextLevel();
    setCurrentQuestion(0);
    setAnswerIdx(null);
    setResult(resultInitialState);
    setShowResult(false);
  };

  const handleTimeUp = (): void => {
    if (answerIdx !== null) {
      onClickNext(answerIdx === test_answer);
    } else {
      onClickNext(false);
    }
  };

  return (
    <div className="quiz-wrapper">
      <div className="quiz-container">
        {!showResult ? (
          <>
            <AnswerTimer key={currentQuestion} duration={10} onTimeUp={handleTimeUp} />
            <span className="active-question-no">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <h2>{question}</h2>
            <ul>
              {answers.map((answer, index) => (
                <li
                  key={index}
                  onClick={() => onAnswerClick(answer, index)}
                  className={answerIdx === index ? "selected-answer" : ""}
                >
                  {answer}
                </li>
              ))}
            </ul>
            <div className="footer">
              <p className="level">
                Level: <span className="current-level">{currentLevel}</span>
              </p>
              <button
                onClick={() => onClickNext(answerIdx === test_answer)}
                disabled={answerIdx === null || isUpdatingScore}
              >
                {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </>
        ) : (
          <div className="result">
            <h3>Result</h3>
            <p>
              Total Questions: <span>{questions.length}</span>
            </p>
            <p>
              Total GP: <span>{result.GP}</span>
            </p>
            <p>
              Correct Answers: <span>{result.correctAnswers}</span>
            </p>
            <p>
              Wrong Answers: <span>{result.wrongAnswers}</span>
            </p>
            <p>
              Level: <span>{currentLevel}</span>
            </p>
            {updateError && <p className="update-error">{updateError}</p>}
            <button onClick={onTryAgain}>Try again</button>
            {hasNextLevel && (
              <button onClick={handleNextLevel} disabled={isUpdatingScore}>
                {isUpdatingScore ? (
                  <>
                    Updating...
                    <div className="spinner"></div>
                  </>
                ) : (
                  "Next Level"
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;