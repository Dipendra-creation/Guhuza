import '../styles/aboutgame.css'
const AboutGame = () => {
  return (
    <div>
      <div className="container">
                <h1>How to earn GP</h1>
                <p>Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos...</p>
                <div className="container">
                <h1>How to Earn These Badges</h1>
                <div className="section">
                    <p>In Guhuza, players can earn badges and experience points (GP | GxP) by participating in quizzes and engaging with the platform. Each correct answer rewards 10 GP, while each incorrect answer deducts 5 GP. Players can boost their scores by sharing the game (100 GP per share) or referring friends (100 GP per referral). A daily lucky draw offers between 10 and 100 GP. To complete a level, players must answer seven questions. Additionally, daily rewards are given for seven consecutive days, ranging from 10 GP to 70 GP. Higher scores place players at the top of the leaderboard, increasing visibility for companies posting job opportunities.</p>
                    <p>Achievements are categorized as follows:</p>
                    <p><strong>Ranking Achievements:</strong> "Leaderboard King" is awarded to the 1st place holder, "Silver Strategist" for 2nd place, and "Bronze Challenger" for 3rd place.</p>
                    <p><strong>Engagement Achievements:</strong> "Loyal Player" is earned by logging in for 30 consecutive days, "Social Influencer" by sharing achievements on social media, and "Referral Master" by referring 20 friends.</p>
                    <p><strong>Milestone Achievements:</strong> "Undisputed Champion" is given to players who hold 1st place for three consecutive months, while "Ultimate Quiz Master" is awarded for completing all 50 game levels.</p>
                    <p><strong>Level Completion Achievements:</strong> "Elite Finisher" is awarded for completing Level 50, "Determined Player" for Level 30, "Expert Mind" for Levels 31-40, and "Master of Knowledge" for Levels 41-50.</p>
                </div>
            </div>
                <div className="section achievements-container">
                    <h2>Achievements</h2>
                    <div className="achievements-grid">
                        <div className="achievement-row">
                            <div className="achievement-item"><img src="/src/assets/badges/1st Ranking.png" alt="Leaderboard King" /><p>Leaderboard King </p></div>
                            <div className="achievement-item"><img src="/src/assets/badges/2nd Ranking.png" alt="Silver Strategist" /><p>Silver Strategist  </p></div>
                            <div className="achievement-item"><img src="/src/assets/badges/3rd Ranking.png" alt="Bronze Challenger" /><p>Bronze Challenger</p></div>
                            <div className="achievement-item"><img src="/src/assets/badges/2nd Ranking.png" alt="Local Player" /> <p>Local Player</p></div>
                            <div className="achievement-item"><img src="badge5.png" alt="Social Influencer" /><p>📣 Social Influencer – Share results</p></div>
                        </div>
                        <div className="achievement-row">
                            <div className="achievement-item"><img src="badge6.png" alt="Referral Master" /><p>👥 Referral Master – Refer 20 friends</p></div>
                            <div className="achievement-item"><img src="badge7.png" alt="Undisputed Champion" /><p>🏅 Undisputed Champion – 1st place for 3 months</p></div>
                            <div className="achievement-item"><img src="badge8.png" alt="Ultimate Quiz Master" /><p>🏆 Ultimate Quiz Master – Complete all 50 levels</p></div>
                            <div className="achievement-item"><img src="badge9.png" alt="Elite Finisher" /><p>🎖️ Elite Finisher – Complete Level 50</p></div>
                            <div className="achievement-item"><img src="badge1.png" alt="Leaderboard King" /><p>🏆 Leaderboard King – 1st place</p></div>
                        </div>
                        
                        <div className="achievement-row">
                            <div className="achievement-item"><img src="badge2.png" alt="Silver Strategist" /><p>🥈 Silver Strategist – 2nd place</p></div>
                            <div className="achievement-item"><img src="badge3.png" alt="Bronze Challenger" /><p>🥉 Bronze Challenger – 3rd place</p></div>
                            <div className="achievement-item"><img src="badge4.png" alt="Loyal Player" /><p>📅 Loyal Player – Log in for 30 days</p></div>
                            <div className="achievement-item"><img src="badge5.png" alt="Social Influencer" /><p>📣 Social Influencer – Share results</p></div>
                            <div className="achievement-item"><img src="badge6.png" alt="Referral Master" /><p>👥 Referral Master – Refer 20 friends</p></div>
                        </div>
                    </div>
                </div>

                

                <h1><b>How to Play</b></h1>
                
                    <p>Answer quiz questions correctly to earn GP.</p>
                    <p>Share your progress to gain extra points.</p>
                    <p>Refer friends to earn referral rewards.</p>
                    <p>Participate in the daily lucky draw to boost your points.</p>

                <h2>Rules</h2>
                <p>Any points will be called as Guhuza Point | Guhuza Experience (GP | GxP).</p>
                    <p>Each correct answer will give you 10 GP, while each wrong answer will deduct 5 GP.</p>
                    <p>Each share will earn you 100 GP, and each referral will earn you 100 GP.</p>
                    <p>Daily lucky draw spin from 10 GP - 100 GP.</p>
                    <p>To complete the level, you have to answer 7 questions.</p>
                    <p>Daily rewards for 7 days range from 10 GP - 70 GP.</p>
                    <p>Time limit applies to each question.</p>
                    <p>People with more points will appear at the top of the list for companies posting jobs.</p>
                
                    
                  
                </div>

                <h2>Terms and Conditions</h2>
                <p>Players must abide by the quiz rules and maintain fair play.</p>
                    <p>Points earned cannot be exchanged for real money.</p>
                    <p>Leaderboard rankings are updated in real time.</p>
            </div>
      
   
  )
}

export default AboutGame
