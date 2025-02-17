import React, { useState, useEffect } from "react";
import { resultInitialState } from "../../constants";
import "./Quiz.css";
import AnswerTimer from "../AnswerTimer/AnswerTimer";
import axios from "axios";

// 1) IMPORT YOUR MASCOTS
import GerrieInfo from "../../assets/Gerrie Mascot/Gerrie_info.png";
import GerrieHappy from "../../assets/Gerrie Mascot/Happy_Gerrie.png";
import GerrieSad from "../../assets/Gerrie Mascot/Sad_gerrie.png";

interface UserProfile {
  score: number;
  highestLevelCompleted: number;
}

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
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answerIdx, setAnswerIdx] = useState<number | null>(null);
  const [result, setResult] = useState<QuizResult>(resultInitialState);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isUpdatingScore, setIsUpdatingScore] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  // Track if the answer has been checked
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const hasNextLevel = currentLevel < maxLevel;
  const { question, test_answer, answers } = questions[currentQuestion];

  // Fetch profile from backend
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not authenticated. Please log in.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get("http://localhost:5001/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data.user);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to fetch profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Only allow answer selection if not checked already
  const onAnswerClick = (answer: string, index: number): void => {
    if (isChecked) return;
    setAnswerIdx(index);
  };

  // When user clicks "Check", mark it as checked
  const handleCheckClick = (): void => {
    if (answerIdx === null) return;
    setIsChecked(true);
  };

  // Move to the next question (or show results) and update the score
  const onClickNext = async (finalAnswer: boolean): Promise<void> => {
    const deltaGP = finalAnswer ? 10 : -5;
    const deltaCorrect = finalAnswer ? 1 : 0;
    const deltaWrong = finalAnswer ? 0 : 1;

    setResult((prev) => ({
      ...prev,
      GP: prev.GP + deltaGP,
      correctAnswers: prev.correctAnswers + deltaCorrect,
      wrongAnswers: prev.wrongAnswers + deltaWrong,
    }));

    await updateUserScore(deltaGP, deltaCorrect, deltaWrong);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
    setAnswerIdx(null);
    setIsChecked(false);
  };

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
      await axios.put("http://localhost:5001/api/auth/update-score", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Re-fetch profile after score update
      await fetchProfile();
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

  const handleNextLevel = async (): Promise<void> => {
    await updateUserScore(0, 0, 0, currentLevel + 1);
    onNextLevel();
    setCurrentQuestion(0);
    setAnswerIdx(null);
    setResult(resultInitialState);
    setShowResult(false);
    setIsChecked(false);
  };

  const handleTimeUp = (): void => {
    if (!isChecked) {
      setIsChecked(true);
    }
  };

  // Decide which mascot image + comment to show during the question phase
  const getMascotAndComment = () => {
    if (!isChecked) {
      return {
        image: GerrieInfo,
        comment: "Select an option",
      };
    } else if (answerIdx === test_answer) {
      return {
        image: GerrieHappy,
        comment: "Great job!",
      };
    } else {
      return {
        image: GerrieSad,
        comment: "Don’t worry, try again!",
      };
    }
  };

  // Final comment based on the score:
  const getScoreComment = () => {
    const total = questions.length;
    const correct = result.correctAnswers;
    const ratio = correct / total;

    if (ratio === 1) return "Perfect score! You nailed it!";
    if (ratio >= 0.7) return "Awesome job! Keep it up!";
    if (ratio >= 0.4) return "Not bad! A bit more practice will help!";
    return "Don’t worry, practice makes perfect!";
  };

  const { image, comment } = getMascotAndComment();

  if (loading) {
    return <div className="score-page-container">Loading...</div>;
  }

  if (error) {
    return <div className="score-page-container error">{error}</div>;
  }

  if (!profile) {
    return <div className="score-page-container">No profile data available.</div>;
  }

  return (
    <div className="quiz-wrapper">
      <p>
        <strong>Total GP:</strong> {profile.score}
      </p>

      <div className="quiz-container">
        {!showResult ? (
          <>
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
          // RESULT SCREEN
          <div className="result">
            <div className="mascot-container result-mascot">
              <img src={GerrieInfo} alt="Info Mascot" className="mascot-image" />
              <div className="comment-bubble">{getScoreComment()}</div>
            </div>

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
      {!showResult && (
        <div className="mascot-container">
          <img src={image} alt="Mascot" className="mascot-image" />
          <div className="comment-bubble">{comment}</div>
        </div>
      )}
    </div>
  );
};

export default Quiz; 