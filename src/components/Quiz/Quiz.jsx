// src/components/Quiz/Quiz.jsx
import { useState } from "react";
import { resultInitialState } from "../../constants";
import PropTypes from "prop-types";
import "./Quiz.css";
import AnswerTimer from "../AnswerTimer/AnswerTimer";

const Quiz = ({ questions, onNextLevel }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);

  // Destructure current question details
  const { question, test_answer, answers } = questions[currentQuestion];

  // Handler for when a user selects an answer
  const onAnswerClick = (answer, index) => {
    setAnswerIdx(index);
  };

  // Handler for moving to the next question or finalizing the quiz
  const onClickNext = (finalAnswer) => {
    // Update the result based on whether the answer was correct
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

    // Proceed to the next question or show the result if it's the last question
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
    // Reset the selected answer
    setAnswerIdx(null);
  };

  // Reset the quiz to try again
  const onTryAgain = () => {
    setCurrentQuestion(0);
    setAnswerIdx(null);
    setResult(resultInitialState);
    setShowResult(false);
  };

  // Handler for when the answer timer expires
  const handleTimeUp = () => {
    // If an answer was selected, check if it's correct; otherwise, count as incorrect
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
            <button onClick={onNextLevel}>Next Level</button>
          </div>
        )}
      </div>
    </div>
  );
};

Quiz.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      comment: PropTypes.string,
      test_answer: PropTypes.number.isRequired,
      answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  onNextLevel: PropTypes.func.isRequired,
};

export default Quiz;