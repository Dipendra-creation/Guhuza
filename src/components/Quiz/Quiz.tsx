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

const Quiz: React.FC<QuizProps> = ({
  questions,
  onNextLevel,
  currentLevel,
  maxLevel,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answerIdx, setAnswerIdx] = useState<number | null>(null);
  const [result, setResult] = useState<QuizResult>(resultInitialState);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isUpdatingScore, setIsUpdatingScore] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  // New state to track if the answer has been checked
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const hasNextLevel = currentLevel < maxLevel;
  const { question, test_answer, answers } = questions[currentQuestion];

  // Only allow answer selection if not checked already
  const onAnswerClick = (answer: string, index: number): void => {
    if (isChecked) return;
    setAnswerIdx(index);
  };

  // When user clicks "Check", we set isChecked to true (which also stops the timer)
  const handleCheckClick = (): void => {
    if (answerIdx === null) return;
    setIsChecked(true);
  };

  // This function handles moving to the next question after checking the answer.
  // It also updates the user’s score and resets isChecked for the next question.
  const onClickNext = async (finalAnswer: boolean): Promise<void> => {
    // Calculate delta values for this question:
    const deltaGP = finalAnswer ? 10 : -5;
    const deltaCorrect = finalAnswer ? 1 : 0;
    const deltaWrong = finalAnswer ? 0 : 1;

    // Update local state for feedback:
    setResult((prev) => ({
      ...prev,
      GP: prev.GP + deltaGP,
      correctAnswers: prev.correctAnswers + deltaCorrect,
      wrongAnswers: prev.wrongAnswers + deltaWrong,
    }));

    // Send delta values to the backend to increment the stored score:
    await updateUserScore(deltaGP, deltaCorrect, deltaWrong);

    // Move to the next question or, if this is the last question, show results:
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
    setAnswerIdx(null);
    setIsChecked(false); // reset for next question
  };

  /**
   * Function to update the user's score in the database.
   */
  const updateUserScore = async (
    deltaGP: number,
    deltaCorrect: number,
    deltaWrong: number,
    newLevelCompleted?: number
  ) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      setIsUpdatingScore(true);
      setUpdateError(null);
      const payload: any = {
        deltaGP,
        deltaCorrect,
        deltaWrong,
      };
      if (newLevelCompleted !== undefined) {
        payload.newLevelCompleted = newLevelCompleted;
      }
      await axios.put(
        "http://localhost:5001/api/auth/update-score",
        payload,
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
    setIsChecked(false);
  };

  // When the level is completed and the user clicks "Next Level"
  const handleNextLevel = async (): Promise<void> => {
    await updateUserScore(0, 0, 0, currentLevel + 1);
    onNextLevel();
    setCurrentQuestion(0);
    setAnswerIdx(null);
    setResult(resultInitialState);
    setShowResult(false);
    setIsChecked(false);
  };

  // If time is up and the user hasn't checked yet, we can simulate a check.
  const handleTimeUp = (): void => {
    if (!isChecked) {
      // If an answer was selected, we simply mark it as checked.
      // Otherwise, you might want to mark the question as unanswered.
      setIsChecked(true);
    }
  };

  return (
    <div className="quiz-wrapper">
      <div className="quiz-container">
        {!showResult ? (
          <>
            {/* Only show the timer if the user hasn’t clicked "Check" */}
            {!isChecked && (
              <AnswerTimer
                key={currentQuestion}
                duration={10}
                onTimeUp={handleTimeUp}
              />
            )}
            <span className="active-question-no">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <h2>{question}</h2>
            <ul>
              {answers.map((answer, index) => {
                let liClass = "";
                if (isChecked) {
                  // When checked, highlight the correct answer in green
                  // and if the user’s selection is wrong, highlight it in red.
                  if (index === test_answer) {
                    liClass = "correct-answer";
                  } else if (index === answerIdx && answerIdx !== test_answer) {
                    liClass = "wrong-answer";
                  }
                } else {
                  liClass = answerIdx === index ? "selected-answer" : "";
                }
                return (
                  <li
                    key={index}
                    onClick={() => onAnswerClick(answer, index)}
                    className={liClass}
                  >
                    {answer}
                  </li>
                );
              })}
            </ul>
            <div className="footer">
              <p className="level">
                Level: <span className="current-level">{currentLevel}</span>
              </p>
              {/* Show the Check button only if the answer hasn’t been checked */}
              {!isChecked && (
                <button
                  onClick={handleCheckClick}
                  disabled={answerIdx === null || isUpdatingScore}
                >
                  Check
                </button>
              )}
              <button
                onClick={() => onClickNext(answerIdx === test_answer)}
                disabled={!isChecked || isUpdatingScore}
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
                  "Unlock Next Level"
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