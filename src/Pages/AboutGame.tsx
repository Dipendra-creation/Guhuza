import React from 'react'; 
import '../styles/aboutgame.css';

const AboutGame: React.FC = () => {
  return (
    <>
    <div className="page-container">
      <div className="earn-card">
        <h1>How to Earn <span className="highlight">GP</span></h1>
        <p>
          In <b className="highlight">Guhuza</b>, players earn 
          <b className="gp-text"> Guhuza Points (GP) </b> and 
          <b className="xp-text"> Guhuza Experience (GxP) </b>
          by participating in quizzes and engaging in platform activities.
        </p>

        <div className="earn-list">
          <div className="earn-item correct">
            ✅ <span>Correct answers:</span> <b>+10 GP</b>
          </div>
          <div className="earn-item incorrect">
            ❌ <span>Incorrect answers:</span> <b>-5 GP</b>
          </div>
          <div className="earn-item share">
            📢 <span>Share the game:</span> <b>+100 GP per share</b>
          </div>
          <div className="earn-item refer">
            👥 <span>Refer a friend:</span> <b>+100 GP</b> 
          </div>
          <div className="earn-item draw">
            🎁 <span>Daily Lucky Draw:</span> <b>10 GP - 100 GP</b>
          </div>
          <div className="earn-item level">
            📚 <span>Complete a level:</span> Answer <b>7 questions correctly</b>
          </div>
          <div className="earn-item login">
            🎉 <span>Daily login rewards (7 days):</span> <b>10 GP - 70 GP</b>
          </div>
        </div>

        <p className="earn-footer">
          Each question is timed, making the experience fast-paced and competitive.
          Players with higher <b className="gp-text">GP scores</b> rank higher on the leaderboard,
          increasing their visibility to companies posting jobs on the platform.  
          <b className="highlight"> Strategic gameplay and consistency </b> are key 
          to maximizing rewards and climbing the leaderboard!
        </p>
      </div>
    </div>
    <div className="section achievements-container">
        <h1>
          <b>Badges</b>
        </h1>
        <div className="achievements-grid">
          <div className="achievement-row">
            <div className="achievement-item" data-title="Achieve 1st rank to earn this badge">
              <img src="/src/assets/badges/1st Ranking.png" alt="Leaderboard King" />
              <p>Leaderboard King</p>
            </div>
            <div className="achievement-item" data-title="Achieve 2nd rank to earn this badge">
              <img src="/src/assets/badges/2nd Ranking.png" alt="Silver Strategist" />
              <p>Silver Strategist</p>
            </div>
            <div className="achievement-item" data-title="Achieve 3rd rank to earn this badge">
              <img src="/src/assets/badges/3rd Ranking.png" alt="Bronze Challenger" />
              <p>Bronze Challenger</p>
            </div>
            <div className="achievement-item" data-title="Log in for 30 consecutive days">
              <img src="/src/assets/badges/30 day login.png" alt="Loyal Player" />
              <p>Loyal Player</p>
            </div>
            <div className="achievement-item" data-title="Share your achievements on social media">
              <img src="/src/assets/badges/20 share.png" alt="Social Influencer" />
              <p>Social Influencer</p>
            </div>
          </div>

          <div className="achievement-row">
            <div className="achievement-item" data-title="Refer 20 friends who sign up and play">
              <img src="/src/assets/badges/20 referral.png" alt="Referral Master" />
              <p>Referral Master</p>
            </div>
            <div className="achievement-item" data-title="Maintain 1st place for 3 consecutive months">
              <img src="/src/assets/badges/1st for 3 month.png" alt="Undisputed Champion" />
              <p>Undisputed Champion</p>
            </div>
            <div className="achievement-item" data-title="Complete all 50 levels of the game">
              <img src="/src/assets/badges/all level completed.png" alt="Ultimate Quiz Master" />
              <p>Ultimate Quiz Master</p>
            </div>
            <div className="achievement-item" data-title="Complete Level 40">
              <img src="/src/assets/badges/40 level completed.png" alt="Elite Finisher" />
              <p>Elite Finisher</p>
            </div>
            <div className="achievement-item" data-title="Complete Level 30">
              <img src="/src/assets/badges/30 level completed.png" alt="Determined Player" />
              <p>Determined Player</p>
            </div>
          </div>

          <div className="achievement-row">
            <div className="achievement-item" data-title="Complete Expert Level (31-40)">
              <img src="/src/assets/badges/expert level completed.png" alt="Expert Mind" />
              <p>Expert Mind</p>
            </div>
            <div className="achievement-item" data-title="Complete Master Level (41-50)">
              <img src="/src/assets/badges/master level completed.png" alt="Master of Knowledge" />
              <p>Master of Knowledge</p>
            </div>
            <div className="achievement-item" data-title="Earn 3000 GP">
              <img src="/src/assets/badges/earned 3000 GP.png" alt="Point Collector" />
              <p>Point Collector</p>
            </div>
            <div className="achievement-item" data-title="Reach 5000 GP">
              <img src="/src/assets/badges/earned 5000 GP.png" alt="Quiz Tycoon" />
              <p>Quiz Tycoon</p>
            </div>
            <div className="achievement-item" data-title="Accumulate 7000 GP">
              <img src="/src/assets/badges/earned 7000 GP.png" alt="Legendary Gamer" />
              <p>Legendary Gamer</p>
            </div>
          </div>
        </div>
      </div>

      <div className="game-info-container">
      {/* ===== Row 1: How to Play (left) & Level Progression (right) ===== */}
      <div className="row">
        {/* How to Play */}
        <div className="info-box">
          <h1 className="info-title">🎮 How to Play</h1>
          <ul>
            {[
              "Answer quiz questions correctly to earn GP.",
              "Share your progress to gain extra points.",
              "Refer friends to earn referral rewards.",
              "Participate in the daily lucky draw to boost your points.",
            ].map((point, index) => (
              <li key={index}>✔ {point}</li>
            ))}
          </ul>
        </div>

        {/* Level Progression */}
        <div className="info-box">
          <h1 className="info-title">🚀 Level Progression</h1>
          <p>
            Players must complete smaller levels to unlock the next stage. There are five distinct
            player categories:
          </p>
          <ul className="level-list">
            {[
              { level: "1-10", title: "Intern", color: "blue" },
              { level: "11-20", title: "Associate", color: "green" },
              { level: "21-30", title: "Specialist", color: "orange" },
              { level: "31-40", title: "Expert", color: "red" },
              { level: "41-50", title: "Master", color: "purple" },
            ].map((category, index) => (
              <li key={index} className={`level-item ${category.color}`}>
                <b>Level {category.level}:</b> {category.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ===== Row 2: Rules (left) & Terms & Conditions (right) ===== */}
      <div className="row">
        {/* Rules */}
        <div className="info-box">
          <h1 className="info-title">📜 Rules</h1>
          <ul>
            {[
              "Any points will be called as Guhuza Point | Guhuza Experience (GP | GxP).",
              "Each correct answer will give you 10 GP, while each wrong answer will deduct 5 GP.",
              "Each share will earn you 100 GP, and each referral will earn you 100 GP.",
              "Daily lucky draw spin rewards range from 10 GP - 100 GP.",
              "To complete a level, you must answer 7 questions.",
              "Daily rewards for 7 days range from 10 GP - 70 GP.",
              "Time limit of 10 seconds applies to each question.",
              "Players with more points rank higher for job opportunities.",
              "Players must progress sequentially through levels to unlock new challenges.",
              "Unanswered questions will be skipped automatically.",
              "Players are not allowed to go back to previous questions once they proceed.",
            ].map((rule, index) => (
              <li key={index}>✔ {rule}</li>
            ))}
          </ul>
        </div>

        {/* Terms & Conditions */}
        <div className="info-box">
          <h1 className="info-title">📜 Terms and Conditions</h1>
          <ul>
            {[
              "By participating in the Guhuza Quiz, players agree to abide by all rules and regulations set forth by the platform.",
              "Fair Play and Conduct: Players must engage in the quiz with integrity and honesty. Any attempt to manipulate the system, use automated tools, or engage in fraudulent activities will result in disqualification and potential account suspension.",
              "Point System: Earned points (GP | GxP) are solely for in-game achievements and leaderboard rankings. These points have no monetary value and cannot be redeemed for cash or any other form of compensation.",
              "Leaderboard Rankings: Rankings are updated in real-time based on player performance. Any discrepancies should be reported within 24 hours of occurrence.",
              "Account Responsibility: Players are responsible for maintaining the security of their accounts. Sharing login credentials or using multiple accounts to gain an unfair advantage is strictly prohibited.",
              "Technical Issues: Guhuza is not liable for any disruptions, technical failures, or network issues affecting gameplay. Players should ensure stable internet connectivity before participating.",
              "Modification of Rules: Guhuza reserves the right to modify or update the terms and conditions at any time. Continued participation after changes indicates acceptance of the revised terms.",
              "By playing the Guhuza Quiz, you acknowledge and agree to these terms. For any inquiries or concerns, please contact support.",
            ].map((term, index) => (
              <li key={index}>📌 {term}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default AboutGame;
