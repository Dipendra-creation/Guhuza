import React, { useState, useEffect } from "react";
import '../styles/aboutgame.css';

const Badges: React.FC = () => {
  return (
    <div className="section achievements-container">
      <h1 className="header font-bold text-3xl mb-4 mt-10">
        <b>Badges</b>
      </h1>
      <div className="achievements-grid">
        {[
          { src: "1st Ranking.png", alt: "Leaderboard King", title: "Achieve the top position on the leaderboard" },
          { src: "2nd Ranking.png", alt: "Silver Strategist", title: "Secure the 2nd rank in the competition" },
          { src: "3rd Ranking.png", alt: "Bronze Challenger", title: "Earn the 3rd rank through consistent performance" },
          { src: "30 day login.png", alt: "Loyal Player", title: "Log in daily for 30 consecutive days" },
          { src: "20 share.png", alt: "Social Influencer", title: "Share your achievements on social media 20 times" },
          { src: "20 referral.png", alt: "Referral Master", title: "Invite 20 friends who successfully sign up and play" },
          { src: "1st for 3 month.png", alt: "Undisputed Champion", title: "Maintain 1st place for three consecutive months" },
          { src: "all level completed.png", alt: "Ultimate Quiz Master", title: "Successfully complete all 50 levels" },
          { src: "40 level completed.png", alt: "Elite Finisher", title: "Conquer Level 40 with expertise" },
          { src: "30 level completed.png", alt: "Determined Player", title: "Complete Level 30 through perseverance" },
          { src: "expert level completed.png", alt: "Expert Mind", title: "Complete all Expert Levels (31-40)" },
          { src: "master level completed.png", alt: "Master of Knowledge", title: "Complete all Master Levels (41-50)" },
          { src: "earned 3000 GP.png", alt: "Point Collector", title: "Accumulate 3,000 Guhuza Points (GP)" },
          { src: "earned 5000 GP.png", alt: "Quiz Tycoon", title: "Reach 5,000 Guhuza Points (GP) and dominate the leaderboard" },
          { src: "earned 7000 GP.png", alt: "Legendary Gamer", title: "Achieve an impressive 7,000 Guhuza Points (GP)" }
        ].map((badge, index) => (
          <div key={index} className="achievement-item">
            <div className="achievement-content">
              <div className="achievement-front">
                <img src={`/public/assets/badges/${badge.src}`} alt={badge.alt} />
                <p>{badge.alt}</p>
              </div>
              <div className="achievement-back">
                <p>{badge.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badges;