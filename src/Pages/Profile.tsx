// src/pages/Profile.tsx

import React, { useEffect, useRef, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import axios from 'axios';
import html2canvas from 'html2canvas';
import '../styles/profile.css';
import { GrInstagram } from "react-icons/gr";

interface Badge {
  id: number;
  name: string;
  description?: string;
  image: string;
  awardedAt: string;
}

interface Score {
  id: number;
  points: number;
  achievedAt: string;
}

interface UserProfile {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  image?: string;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  highestLevelCompleted: number;
  badges: Badge[];
  scores: Score[];
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Ref for the profile container (for screenshot capture)
  const profileRef = useRef<HTMLDivElement>(null);

  // Helper function to convert relative image path to an absolute URL
  const getImageUrl = (path?: string): string | null => {
    if (!path) return null;
    const parts = path.split('/');
    const filename = parts[parts.length - 1];
    return `http://localhost:5001/uploads/${filename}`;
  };

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get('http://localhost:5001/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data.user);
    } catch (err: any) {
      console.error('Error fetching profile:', err);
      setError(err.response?.data?.error || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // Poll for profile updates every 30 seconds for real-time updates
    const interval = setInterval(fetchProfile, 30000);
    return () => clearInterval(interval);
  }, []);

  /**
   * Capture the screenshot of the profile, download it,
   * then open the corresponding social media site and instruct the user to share manually.
   */
  const handleShareScreenshot = async (platform: 'facebook' | 'instagram' | 'linkedin') => {
    if (!profileRef.current) return;
    try {
      // Capture the screenshot with useCORS enabled.
      const canvas = await html2canvas(profileRef.current, { useCORS: true });
      const dataUrl = canvas.toDataURL('image/png');

      // Create a temporary link to download the screenshot.
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'profile.png';
      link.click();

      // Give a short delay to ensure the download starts.
      setTimeout(() => {
        if (platform === 'facebook') {
          window.open('https://www.facebook.com/', '_blank');
        } else if (platform === 'instagram') {
          window.open('https://www.instagram.com/', '_blank');
        } else if (platform === 'linkedin') {
          window.open('https://www.linkedin.com/', '_blank');
        }
        alert(
          `Your screenshot has been downloaded. Please open your ${platform} account and share the image manually.`
        );
      }, 500);
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!profile) {
    return <div>No profile data available.</div>;
  }

  const imageUrl = getImageUrl(profile.image);

  return (
    <ProtectedRoute>
      <div className="Profile-container" ref={profileRef}>
        {/* Header Section */}
        <div className="Header">
          <div className="Profile-picture">
            {imageUrl ? (
              <img src={imageUrl} alt="Profile" crossOrigin="anonymous" />
            ) : (
              <div className="no-image">No Image</div>
            )}
          </div>
          <div className="Profile-info">
            <h1>{profile.username}</h1>
            <p className="bio">
              Hey, I am {profile.username}. {profile.firstName} {profile.lastName}
            </p>
            <button className="Edit-profile">Edit Profile</button>
            <div className="Status">
              <div className="Status-box">
                <p>
                  <strong>Total GP:</strong> <span>{profile.score}</span>
                </p>
              </div>
              <div className="Status-box">
                <p>
                  <strong>Badges Earned:</strong> <span>{profile.badges.length}</span>
                </p>
              </div>
              <div className="Status-box">
                <p>
                  <strong>Achievement Completed:</strong>{' '}
                  <span>{profile.highestLevelCompleted}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="Badges-section">
          <h2>Badges Earned</h2>
          <div className="Badges-grid">
            {profile.badges.length > 0 ? (
              profile.badges.map((badge) => (
                <div key={badge.id} className="Badge" data-title={badge.description || badge.name}>
                  <img src={badge.image} alt={badge.name} />
                  <p>{badge.name}</p>
                </div>
              ))
            ) : (
              <p>No badges earned yet.</p>
            )}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="Posts-grid">
          <h2>Recent Activity</h2>
          <div className="Posts">
            {profile.scores && profile.scores.length > 0 ? (
              profile.scores
                .sort((a, b) => new Date(b.achievedAt).getTime() - new Date(a.achievedAt).getTime())
                .map((score) => (
                  <div key={score.id} className="Post">
                    <p>
                      Scored {score.points} GP on {new Date(score.achievedAt).toLocaleString()}
                    </p>
                  </div>
                ))
            ) : (
              <p>No recent activity.</p>
            )}
          </div>
        </div>

        {/* Share Profile Section */}
        <div className="Share-profile">
          <h2>Share Profile</h2>
          <div className="Share-buttons">
            <button className="Share-button" onClick={() => handleShareScreenshot('instagram')}>
              <span className="Share-icon"><GrInstagram /></span> Instagram
            </button>
            <button className="Share-button" onClick={() => handleShareScreenshot('facebook')}>
              <span className="Share-icon">FB</span> Facebook
            </button>
            <button className="Share-button" onClick={() => handleShareScreenshot('linkedin')}>
              <span className="Share-icon">IN</span> LinkedIn
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
