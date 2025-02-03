import { useState } from "react"; 
import { resultInitialState } from "../../constants"; 
import PropTypes from 'prop-types';
import './Quiz.css'; 
import AnswerTimer from '../AnswerTimer/AnswerTimer'; 

const Quiz = ({ questions }) => { 
    const [currentQuestion, setCurrentQuestion] = useState(0); 
    const [answerIdx, setAnswerIdx] = useState(null); 
    const [result, setResult] = useState(resultInitialState); 
    const [showResult, setShowResult] = useState(false); 

    const { question, test_answer, answers } = questions[currentQuestion];

    const onAnswerClick = (answer, index) => {
        setAnswerIdx(index);
    };

    const onClickNext = (finalAnswer) => {
        setAnswerIdx(null);
        setResult((prev) =>
            finalAnswer
        ?{
                ...prev,
                GP: prev.GP + 10,
                correctAnswers: prev.correctAnswers + 1,
            }
            :{
                ...prev,
                GP: prev.GP - 5,
                wrongAnswers: prev.wrongAnswers + 1,
            }
        );

        if (currentQuestion !== questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            setCurrentQuestion(0);
            setShowResult(true);
        }
    };

    const onTryAgain = () => {
        setCurrentQuestion(0); 
        setAnswerIdx(null); 
        setResult(resultInitialState); 
        setShowResult(false); 
    };

    const handleTimeUp = () => {
     // If user selected an answer, check it, otherwise count as wrong
      if (answerIdx !== null) {
        onClickNext(answerIdx === test_answer); // ✅ Auto-submit selected answer
    } else {
        onClickNext(false); // ✅ Mark as wrong if unanswered
    }
    };


    return (
        <div className="quiz-container">
            {!showResult ? (
                <>
                <AnswerTimer key={currentQuestion} duration={10} onTimeUp={handleTimeUp} resetTimer={currentQuestion} />
                    <span className="active-question-no">
                        Question {currentQuestion + 1} of {questions.length}
                    </span>
                    <h2>{question}</h2>
                    <ul>
                        {answers.map((answer, index) => (
                            <li
                                onClick={() => onAnswerClick(answer, index)} 
                                key={index} 
                                className={answerIdx === index ? "selected-answer" : null} 
                            >
                                {answer}
                            </li>
                        ))}
                    </ul>
                    <div className="footer">
                    <button onClick={() => onClickNext(answerIdx === test_answer)} disabled={answerIdx === null}>
                            {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
                        </button>
                    </div>
                </>
            ) : (
                <div className="result">
                    <h3>Result</h3>
                    <p>Total Questions: <span>{questions.length}</span></p>
                    <p>Total GP: <span>{result.GP}</span></p>
                    <p>Correct Answers: <span>{result.correctAnswers}</span></p>
                    <p>Wrong Answers: <span>{result.wrongAnswers}</span></p>
                    <button onClick={onTryAgain}>Try again</button> 
                </div>
            )}
        </div>
    );
};Quiz.propTypes = {
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            question: PropTypes.string.isRequired, 
            comment: PropTypes.string, 
            test_answer: PropTypes.number.isRequired, 
            answers: PropTypes.arrayOf(PropTypes.string).isRequired, 
        })
    ).isRequired,
};

export default Quiz;