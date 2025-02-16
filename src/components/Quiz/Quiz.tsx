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

  const onClickNext = (finalAnswer: boolean): void => {
    setResult((prev) =>
      finalAnswer
        ? {
            ...prev,
            GP: prev.GP + 10,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            GP: prev.GP - 5,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // End of level – show result and update user score
      setCurrentQuestion(0);
      setShowResult(true);
    }
    setAnswerIdx(null);
  };

  // Function to update the user's score in the database
  const updateUserScore = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      setIsUpdatingScore(true);
      setUpdateError(null);
      await axios.put(
        "http://localhost:5001/api/auth/update-score",
        {
          level: currentLevel,
          GP: result.GP,
          correctAnswers: result.correctAnswers,
          wrongAnswers: result.wrongAnswers,
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
    await updateUserScore();
    if (!updateError) {
      onNextLevel();
      setCurrentQuestion(0);
      setAnswerIdx(null);
      setResult(resultInitialState);
      setShowResult(false);
    }
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
                disabled={answerIdx === null}
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