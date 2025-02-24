// src/components/Instruction/play_0.tsx

import React, { useState } from "react";
import "./play_0.css";
import Play1 from "../select level/play_1";

const termsText = `
Terms and Conditions for Guhuza Game

Effective Date: 2023-09-20
Last Updated: 2024-09-11

Welcome to Guhuza Game! By accessing and playing this game, you agree to the following terms and conditions. Please read them carefully before using the game.

1. Acceptance of Terms
By using Guhuza Game, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. If you do not agree, you must not use the game.

2. Eligibility
• You must be at least 13 years old to play Guhuza Game.
• If you are under 18, you must have parental or guardian consent.
• You are responsible for ensuring that your participation complies with applicable laws in your country.

3. Game Rules & Fair Play
• Players must complete 10 questions per level to progress.
• Scoring System:
    ✅ Correct Answer: +10 GP
    ❌ Wrong Answer: -5 GP
    ⁉️ Unanswered (Time Out): -5 GP
• Any form of cheating, hacking, or exploitation is strictly prohibited. Players caught violating this rule may face account suspension or permanent ban.

4. User Accounts & Data
• To track progress, players may be required to register an account.
• You are responsible for keeping your login credentials secure.
• The game may collect certain non-sensitive data (e.g., game progress, leaderboard scores) to improve the user experience.
• Personal data will be handled in accordance with our Privacy Policy.

5. Prohibited Activities
You agree NOT to:
• Use bots, scripts, or automated tools to manipulate gameplay.
• Attempt to disrupt the game servers or compromise security.
• Impersonate other players or engage in fraudulent activity.
• Exploit bugs or glitches to gain an unfair advantage.

6. Leaderboard & Rewards
• Players can compete for the highest GP score on the leaderboard.
• Any prizes or rewards (if applicable) are non-transferable and subject to eligibility criteria.
• The game developers reserve the right to disqualify players suspected of unfair play.

7. Modifications & Updates
• Guhuza Game reserves the right to modify or update the game, including:
    - Adding or removing features, levels, or rewards.
    - Implementing bug fixes and security patches.
    - Temporarily suspending or discontinuing the game due to maintenance or unforeseen circumstances.

8. Limitation of Liability
• Guhuza Game is provided “as is” without warranties of any kind.
• The developers are not responsible for:
    - Any data loss, interruptions, or errors in gameplay.
    - Technical failures due to internet connectivity issues.
    - Any indirect, incidental, or consequential damages arising from gameplay.

9. Termination of Access
• The game developers may suspend or terminate your account if you:
    - Violate any of these Terms and Conditions.
    - Engage in cheating, fraud, or abuse.
• You may stop using the game at any time, but no refunds or compensation will be provided.

10. Governing Law & Dispute Resolution
• These terms are governed by the laws of [Your Country].
• Any disputes will be resolved through binding arbitration or the appropriate courts in [Your Country].

11. Contact Information
If you have any questions about these Terms and Conditions, please contact us at:
📧 ojhadipendra99@gmail.com
🌍 www.guhuza.com

By continuing to play Guhuza Game, you accept and agree to these terms. Happy gaming!
`;

const rulesText = `
Guhuza Game - Official Rules

These rules ensure fair play, a smooth gaming experience, and an engaging environment for all players. By playing Guhuza Game, you agree to abide by these rules.

1. General Rules
• The game consists of 50 levels, each containing 10 multiple-choice questions.
• Players must answer all questions to complete a level and unlock the next.
• GP (Guhuza Points) System:
    ✅ Correct Answer: +10 GP
    ❌ Wrong Answer: -5 GP
    ⁉️ Timeout (No Answer): -5 GP
• Each question has a 10-second timer; failing to answer results in a penalty.

2. Fair Play & Conduct
• Cheating, hacking, or exploiting any bugs is strictly prohibited.
• Players must use their own accounts; account sharing is not allowed.
• Respect all players—offensive language, harassment, or hate speech will result in account suspension.
• Any attempt to manipulate scores, leaderboards, or game mechanics is forbidden.

3. Gameplay Mechanics
A. Answering Questions
• Players must click on the correct answer before the timer runs out.
• After selecting an answer, press “Next” to move to the next question.
• Answers cannot be changed once submitted.
B. Advancing to the Next Level
• After completing 10 questions, players see a summary of their performance.
• Click “Next Level” to continue or “Try Again” to replay.
• Players must complete each level to progress to the next.
C. Leaderboard & Ranking
• Scores are recorded and displayed on the leaderboard.
• Compete with other players to achieve the highest GP score.
• Top-ranking players may be eligible for special rewards (if applicable).

4. Time Limits & Auto-Submission
• If a player fails to select an answer within 10 seconds, it will be marked as incorrect.
• The system automatically moves to the next question if the time runs out.

5. Account & Progress Tracking
• Players can track their completed levels, GP scores, and history in their profile.
• Progress is saved automatically, allowing players to resume from where they left off.

6. Technical Issues & Disconnection
• If the game fails to load, refresh the page and check your internet connection.
• If a player disconnects mid-game, progress may be lost for the current level.
• Report any bugs or glitches to the support team.

7. Prohibited Activities
Players must NOT:
🚫 Use bots, scripts, or automated tools.
🚫 Attempt to manipulate scores or cheat.
🚫 Disrupt the game experience for others.
🚫 Engage in offensive behavior, hate speech, or threats.
🚫 Exploit bugs—report them instead.

8. Violations & Penalties
• Minor offenses may result in temporary suspension.
• Serious violations (cheating, hacking, exploiting) may result in permanent bans.
• The game developers reserve the right to take appropriate action against violators.

9. Updates & Rule Changes
• The game developers may update or modify these rules as needed.
• Players will be notified of major changes via in-game announcements.

10. Contact & Support
If you experience issues or have questions regarding these rules, contact us at:
📧 ojhadipendra99@gmail.com
🌍 www.guhuza.com

By playing Guhuza Game, you agree to follow these rules. Enjoy the game and play fair!
`;

const Play0: React.FC = () => {
  const [termsChecked, setTermsChecked] = useState<boolean>(false);
  const [rulesChecked, setRulesChecked] = useState<boolean>(false);
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);
  const [startGame, setStartGame] = useState<boolean>(false); // State to track game start

  const handleStartGame = (): void => {
    setStartGame(true); // Set state to render Play1
  };

  return (
    <div className="page-container">
      {!startGame ? (
        <div className="instructions-container">
          {/* Welcome Section */}
          <div className="welcome-section">
            <h1 className="header-title">Welcome to Guhuza Quiz</h1>
            <p className="intro-text">
              Guhuza is an interactive and engaging quiz game that simulates the real-world job-seeking experience. Progress through different levels, test your knowledge, and compete for the top position on the leaderboard.
            </p>
          </div>

          {/* Instructions Section */}
          <h2 className="header-subtitle">Game Instructions</h2>
          <div className="instructions-box">
            <ol className="instructions-list">
              <li><strong>Starting the Game:</strong> Click on the <b>"Play"</b> button on the home screen to begin the quiz.</li>
              <li><strong>Answering Questions:</strong> Each question has multiple-choice answers. Click on the correct option before the timer runs out. After selecting an answer, click <b>"Next"</b> to move to the next question.</li>
              <li>
                <strong>Scoring System:</strong>
                <ul className="sub-list">
                  <li>✅ Correct Answer: <b>+10 points</b></li>
                  <li>❌ Wrong Answer: <b>-5 points</b></li>
                  <li>⁉️ Unanswered (Time Out): <b>-5 points</b></li>
                </ul>
              </li>
              <li><strong>⏰ Timer System:</strong> Each question has a <b>10-second</b> countdown. If no answer is selected within the time, it will be considered incorrect.</li>
              <li><strong>✔️ Completing a Level:</strong> Each level consists of <b>10 questions</b>. After completing all questions, you will receive a score summary.</li>
              <li><strong>⬆️ Advancing to the Next Level:</strong> After completing a level, click <b>"Next Level"</b> to continue. The game progresses up to <b>Level 50</b>.</li>
              <li><strong>🪜 Leaderboard:</strong> Track your ranking and total score in the <b>Leaderboard</b> section to see how you compare with other players.</li>
              <li><strong>👨‍🎤 Profile & Progress:</strong> Your completed levels, scores, and progress are stored in the <b>Profile</b> section for future reference.</li>
              <li>
                <strong>Troubleshooting:</strong>
                <ul className="sub-list">
                  <li>🔃 If the game does not load, refresh the page.</li>
                  <li>🛜 Ensure a stable internet connection.</li>
                  <li>🥇 Check the <b>Leaderboard</b> if the quiz is temporarily unavailable.</li>
                </ul>
              </li>
            </ol>
          </div>

          {/* Checkbox Section with Modal Links */}
          <div className="checkboxes-container">
            <label className="checkbox-label">
              <input 
                type="checkbox"
                checked={termsChecked}
                onChange={(e) => setTermsChecked(e.target.checked)}
              />
              I agree to the&nbsp;
              <span 
                className="modal-link" 
                onClick={() => setShowTermsModal(true)}
              >
                Terms and Conditions
              </span>.
            </label>
            <label className="checkbox-label">
              <input 
                type="checkbox"
                checked={rulesChecked}
                onChange={(e) => setRulesChecked(e.target.checked)}
              />
              I agree to the&nbsp;
              <span 
                className="modal-link" 
                onClick={() => setShowRulesModal(true)}
              >
                Game Rules
              </span>.
            </label>
          </div>

          {/* Modal for Terms & Conditions */}
          {showTermsModal && (
            <div className="modal-overlay" onClick={() => setShowTermsModal(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Terms and Conditions</h2>
                <pre className="modal-text">{termsText}</pre>
                <button className="modal-close" onClick={() => setShowTermsModal(false)}>Close</button>
              </div>
            </div>
          )}

          {/* Modal for Game Rules */}
          {showRulesModal && (
            <div className="modal-overlay" onClick={() => setShowRulesModal(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Game Rules</h2>
                <pre className="modal-text">{rulesText}</pre>
                <button className="modal-close" onClick={() => setShowRulesModal(false)}>Close</button>
              </div>
            </div>
          )}

          {/* Start Button */}
          <div className="button-container">
            <button 
              className="play-button" 
              onClick={handleStartGame}
              disabled={!(termsChecked && rulesChecked)}
            >
              Start Playing
            </button>
          </div>
        </div>
      ) : (
        <Play1 />
      )}
    </div>
  );
};

export default Play0;