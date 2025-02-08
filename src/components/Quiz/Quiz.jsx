// src/components/Quiz/Quiz.jsx
import { useState } from "react";
import { resultInitialState } from "../../constants";
import PropTypes from "prop-types";
import "./Quiz.css";
import AnswerTimer from "../AnswerTimer/AnswerTimer";

const Quiz = ({ questions, onNextLevel, currentLevel, maxLevel }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);

  // Compute whether there is a next level based on the current level and maximum allowed level.
  const hasNextLevel = currentLevel < maxLevel;

  // Destructure the current question details.
  const { question, test_answer, answers } = questions[currentQuestion];

  // Handler for when a user selects an answer.
  const onAnswerClick = (answer, index) => {
    setAnswerIdx(index);
  };

  // Handler for moving to the next question or finalizing the quiz.
  const onClickNext = (finalAnswer) => {
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
      // End of current level – show the results.
      setCurrentQuestion(0);
      setShowResult(true);
    }
    // Reset the selected answer.
    setAnswerIdx(null);
  };

  // Reset the quiz to try the level again.
  const onTryAgain = () => {
    setCurrentQuestion(0);
    setAnswerIdx(null);
    setResult(resultInitialState);
    setShowResult(false);
  };

  // Handler for when the timer expires.
  const handleTimeUp = () => {
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
            <AnswerTimer
              key={currentQuestion}
              duration={10}
              onTimeUp={handleTimeUp}
              resetTimer={currentQuestion}
            />
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
              {/* Display the current level */}
              <p>
                Level: <span>{currentLevel}</span>
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
            <button onClick={onTryAgain}>Try again</button>
            {hasNextLevel && (
            <button onClick={onNextLevel}>Next Level</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Quiz.propTypes = {
  questions: PropTypes.array.isRequired,
  onNextLevel: PropTypes.func.isRequired,
  currentLevel: PropTypes.number.isRequired,
  maxLevel: PropTypes.number.isRequired,
};

export default Quiz;