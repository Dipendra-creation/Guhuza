import React, { useState, useEffect, useRef } from "react";
import { resultInitialState } from "../../constants";
import "./Quiz.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AnswerTimer from "../AnswerTimer/AnswerTimer";
import CountTimer from "../CountTimer/CountTimer";
import axios from "axios";
import GP from '../../assets/GP.png';
import { FaFacebook,FaLinkedin } from "react-icons/fa";
import { FaXTwitter,FaInstagram } from "react-icons/fa6";
import { LiaDownloadSolid } from "react-icons/lia";
import { TbRepeat } from "react-icons/tb";
import { GrUnlock } from "react-icons/gr";

import html2canvas from "html2canvas";

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
  const resultRef = useRef<HTMLDivElement>(null);
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
  const [screenshotData, setScreenshotData] = useState<string | null>(null);
  const shareUrl = encodeURIComponent(
    window.location.hostname === 'localhost' 
      ? 'http://localhost:5173/play'  // Your local development URL
      : 'https://your-production-domain.com/play'  // Your live domain
  );
  const shareText = encodeURIComponent(
    `I scored ${result.GP} GP on level ${currentLevel} in Guhuza's Quiz! 🚀`
  );
  const socialLinks = {

    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}"e=${shareText}`,
    twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&title=${encodeURIComponent('Quiz Result')}&summary=${shareText}`,
    instagram: 'https://www.instagram.com/'
  };

  const captureScreenshot = async () => {
    if (resultRef.current) {
      try {
        const canvas = await html2canvas(resultRef.current);
        return canvas.toDataURL('image/png');
      } catch (error) {
        console.error('Error capturing screenshot:', error);
      }
    }
  };
  const handleDownload = async () => {
    const dataUrl = await captureScreenshot();
    if (dataUrl) {
      const link = document.createElement('a');
      link.download = `gerrie-quiz-L${currentLevel}-result.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  const handleSocialShare = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  useEffect(() => {
    if (showResult) {
      captureScreenshot().then(dataUrl => {
        if (dataUrl) setScreenshotData(dataUrl);
      });
    }
  }, [showResult]);

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

  // Add this with your other useEffect hooks
useEffect(() => {
  if (showResult) {
    const capture = async () => {
      const dataUrl = await captureScreenshot();
      if (dataUrl) setScreenshotData(dataUrl);
    };
    capture();
  }
}, [showResult]);

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
      toast("Time is up!"); // Changed alert to toast
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
        comment: "Don't worry, try again!",
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
    return "Don't worry, practice makes perfect!";
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
    <div className="quiz-wrapper border-2 border-red-700 rounded-lg p-4">
      <p className="total-score gap-2.5">
        <img src={GP} className="h-9 w-9" alt="GP Icon" />
        <strong> {profile.score || 0} GP</strong>
      </p>
  
      <div className="quiz-container ">
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
            <div className="timer">
              <CountTimer 
                key={currentQuestion}
                duration={10} 
                onTimeUp={handleTimeUp} 
              />
              
              <ToastContainer 
    position="bottom-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
            </div>
  
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
              <p className="level bg-transparent">
                Level: <span className="bg-transparent">{currentLevel}</span>
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
          // Updated RESULT SCREEN
          <div ref={resultRef} className="border-2">
            <div className="result">
              <div className="mascot-container">
                <img src={GerrieInfo} alt="Info Mascot" className="mascot-image" />
                <div className="comment-bubble">{getScoreComment()}</div>
              </div>
  
              <div className="result-info">     
                <p className="your-score">
                  Your Score: <span className="result-GP ml-8 font-mono">{result.GP}</span>
                </p>
                <h3>Result</h3>
                <p>
                  Total Questions: <span>{questions.length}</span>
                </p>
                <p>
                  Correct Answers: <span>{result.correctAnswers}</span>
                </p>
                <p>
                  Wrong Answers: <span>{result.wrongAnswers}</span>
                </p>
                <p className="result-level">
                  Level: <span>{currentLevel}</span>
                </p>
                {updateError && <p className="update-error">{updateError}</p>}
                <div className="button-container flex items-center justify-evenly gap-2 w-full">
  
  <button onClick={onTryAgain} className="try-again-button flex items-center gap-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-all">
    <TbRepeat /> Try again
  </button>

  {hasNextLevel && (
    <button 
      onClick={handleNextLevel} 
      disabled={isUpdatingScore}
      className={`flex items-center gap-1 px-4 py-2 font-semibold rounded-lg shadow-md transition-all 
                  ${isUpdatingScore ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}
    >
      {isUpdatingScore ? (
        <>
          Updating...
          <div className="spinner border-t-2 border-white border-solid rounded-full w-4 h-4 animate-spin"></div>
        </>
      ) : (
        <div className="flex items-center gap-1">
          <GrUnlock /> Unlock Next Level
        </div>
      )}
    </button>
  )}

</div>

              </div>
            </div>
  
{/* Updated Share Section (remove preview) */}
<div className="share-section">
  <p className="share-text flex flex-col items-center font-bold text-lg">Share your score and earn more GP!</p>
  
  <div className="share-controls">
    
    <div className="social-buttons">
    <button
        onClick={() => {
          const url = encodeURIComponent(window.location.href);
          const text = encodeURIComponent(`🎉 I scored ${result.GP} GP on Level ${currentLevel} in Guhuza's Quiz!`);
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${url}"e=${text}`,
            '_blank',
            'width=600,height=400'
          );
        }}
        className="social-btn facebook"
      >
        <FaFacebook />
      </button>

      <button
        onClick={() => handleSocialShare(socialLinks.instagram)}
        className="social-btn instagram"
      >
        <FaInstagram />
      </button>


      <button
        onClick={() => {
          const text = encodeURIComponent(`🏆 I scored ${result.GP} GP on Level ${currentLevel}! Challenge me: ${window.location.href}`);
          const hashtags = encodeURIComponent('GuhuzaQuiz');
          window.open(
            `https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtags}`,
            '_blank',
            'width=600,height=400'
          );
        }}
        className="social-btn twitter"
      >
        <FaXTwitter />
      </button>

      <button
        onClick={() => {
          const url = encodeURIComponent(window.location.href);
          const title = encodeURIComponent(`Scored ${result.GP} GP on Level ${currentLevel}`);
          const summary = encodeURIComponent(`Join me in Guhuza's Quiz and beat my score!`);
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`,
            '_blank',
            'width=600,height=400'
          );
        }}
        className="social-btn linkedin"
      >
        <FaLinkedin />
      </button>
     

    </div>
    <div className="flex flex-col items-center">
    <button 
        onClick={handleDownload} 
        className="download-btn flex items-center gap-2 px-5"
    >
        <LiaDownloadSolid className=" text-xl" /> 
        Download Result
    </button>
</div>

  </div>
</div>
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

};export default Quiz; 
