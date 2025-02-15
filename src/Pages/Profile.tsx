import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import axios from 'axios';
import '../styles/profile.css';

interface UserProfile {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  image?: string;
  // Additional fields from the database can be added here if available
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
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

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!profile) {
    return <div>No profile data available.</div>;
  }

  // Set default values for additional fields (not yet in database)
  const highScore = 0;
  const badgesEarned = 0;
  const achievementCompleted = 0;
  const totalShare = 0;
  const totalReferral = 0;

  return (
    <ProtectedRoute>
      <div className="Profile-continer">
        {/* Header Section */}
        <div className="Header">
          <div className="Profile-picture">
            {profile.image ? (
              <img src={profile.image} alt="Profile" />
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
                  <strong>High Score:</strong> <span>{highScore}</span>
                </p>
              </div>
              <div className="Status-box">
                <p>
                  <strong>Badges Earned:</strong> <span>{badgesEarned}</span>
                </p>
              </div>
              <div className="Status-box">
                <p>
                  <strong>Achievement Completed:</strong> <span>{achievementCompleted}</span>
                </p>
              </div>
              <div className="Status-box">
                <p>
                  <strong>Total Share:</strong> <span>{totalShare}</span>
                </p>
              </div>
              <div className="Status-box">
                <p>
                  <strong>Total Referral:</strong> <span>{totalReferral}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="Badges-section">
          <h2>Badges Earned</h2>
          <div className="Badges-grid">
            {/* Replace these with dynamic data if available; for now static */}
            <div className="Badge" data-title="Achieve 2nd rank to earn this badge">
              <img src="/src/assets/badges/2nd Ranking.png" alt="Silver Strategist" />
              <p>Silver Strategist</p>
            </div>
            <div className="Badge" data-title="Log in for 30 consecutive days">
              <img src="/src/assets/badges/30 day login.png" alt="Loyal Player" />
              <p>Loyal Player</p>
            </div>
            <div className="Badge" data-title="Share your achievements on social media">
              <img src="/src/assets/badges/20 share.png" alt="Social Influencer" />
              <p>Social Influencer</p>
            </div>
            <div className="Badge" data-title="Complete Level 30">
              <img src="/src/assets/badges/30 level completed.png" alt="Determined Player" />
              <p>Determined Player</p>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="Posts-grid">
          <h2>Recent Activity</h2>
          <div className="Posts">
            <div className="Post">
              <p>Completed Level 5 in Resume Building</p>
            </div>
            <div className="Post">
              <p>Shared profile with 3 friends</p>
            </div>
            <div className="Post">
              <p>Earned the Quiz Master badge</p>
            </div>
          </div>
        </div>

        {/* Share Profile Section */}
        <div className="Share-profile">
          <h2>Share Profile</h2>
          <div className="Share-buttons">
            <a
              href="https://www.instagram.com/guhuza_/"
              target="_blank"
              rel="noopener noreferrer"
              className="Share-button"
            >
              <span className="Share-icon">IG</span>
              Instagram
            </a>
            <a
              href="https://www.facebook.com/Guhuza#"
              target="_blank"
              rel="noopener noreferrer"
              className="Share-button"
            >
              <span className="Share-icon">FB</span>
              Facebook
            </a>
            <a
              href="https://x.com/?lang=en&mx=2"
              target="_blank"
              rel="noopener noreferrer"
              className="Share-button"
            >
              <span className="Share-icon">TW</span>
              Twitter
            </a>
            <a
              href="https://www.linkedin.com/company/guhuza/"
              target="_blank"
              rel="noopener noreferrer"
              className="Share-button"
            >
              <span className="Share-icon">LI</span>
              Linkedin
            </a>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;