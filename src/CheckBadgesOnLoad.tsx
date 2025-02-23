// src/components/CheckBadgesOnLoad.tsx

import React, { useEffect } from "react";
import axios from "axios";

interface ProfileData {
  rank?: number;
  score: number;
  highestLevelCompleted: number;
  // Extend with additional fields if needed later (e.g., loginStreak, shareCount, referralCount)
}

interface CheckBadgesOnLoadProps {
  profile: ProfileData;
}

const CheckBadgesOnLoad: React.FC<CheckBadgesOnLoadProps> = ({ profile }) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const awardBadge = async (badgeId: number) => {
      try {
        await axios.post(
          "http://localhost:5001/api/auth/award-badge",
          { badgeId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(`Award badge ${badgeId} attempted`);
      } catch (error: any) {
        console.error(
          `Error awarding badge ${badgeId}:`,
          error.response?.data || error
        );
      }
    };

    // --- Rank-based badges ---
    if (profile.rank === 1) {
      awardBadge(16); // Leaderboard King
    }
    if (profile.rank === 2) {
      awardBadge(15); // Silver Strategist
    }
    if (profile.rank === 3) {
      awardBadge(14); // Bronze Challenger
    }

    // --- Level-based badges ---
    if (profile.highestLevelCompleted === 50) {
      awardBadge(9); // Ultimate Quiz Master
    }
    if (profile.highestLevelCompleted >= 41 && profile.highestLevelCompleted < 50) {
      awardBadge(5); // Master of Knowledge
    }
    if (profile.highestLevelCompleted >= 40) {
      awardBadge(8); // Elite Finisher
    }
    if (profile.highestLevelCompleted >= 31 && profile.highestLevelCompleted <= 40) {
      awardBadge(6); // Expert Mind
    }
    if (profile.highestLevelCompleted >= 30) {
      awardBadge(7); // Determined Player
    }

    // --- GP-based badges ---
    if (profile.score >= 7000) {
      awardBadge(2); // Legendary Gamer
    }
    if (profile.score >= 5000) {
      awardBadge(3); // Quiz Tycoon
    }
    if (profile.score >= 3000) {
      awardBadge(4); // Point Collector
    }

    // Conditions for Loyal Player, Social Influencer, Referral Master, and Undisputed Champion
    // are not included here as they require additional tracking fields.
  }, [profile]);

  return null;
};

export default CheckBadgesOnLoad;