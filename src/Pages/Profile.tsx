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
  score: number;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Helper function to convert relative image path to absolute URL
  const getImageUrl = (path?: string): string | null => {
    if (!path) return null;
    // Assuming the path stored is something like "../uploads/filename.jpg"
    // We extract the filename and prepend our backend URL.
    const parts = path.split('/');
    const filename = parts[parts.length - 1];
    return `http://localhost:5001/uploads/${filename}`;
  };

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

  const imageUrl = getImageUrl(profile.image);

  return (
    <ProtectedRoute>
      <div className="Profile-container">
        {/* Header Section */}
        <div className="Header">
          <div className="Profile-picture">
            {imageUrl ? (
              <img src={imageUrl} alt="Profile" />
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
                  <strong>Badges Earned:</strong> <span>5</span>
                </p>
              </div>
              <div className="Status-box">
                <p>
                  <strong>Achievement Completed:</strong> <span>10</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="Badges-section">
          <h2>Badges Earned</h2>
          <div className="Badges-grid">
            <div className="Badge" data-title="Achieve 2nd rank to earn this badge">
              <img src="/src/assets/badges/2nd Ranking.png" alt="Silver Strategist" />
              <p>Silver Strategist</p>
            </div>
            <div className="Badge" data-title="Log in for 30 consecutive days">
              <img src="/src/assets/badges/30 day login.png" alt="Loyal Player" />
              <p>Loyal Player</p>
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
            <a href="https://www.instagram.com/guhuza_/" target="_blank" rel="noopener noreferrer" className="Share-button">
              <span className="Share-icon">IG</span> Instagram
            </a>
            <a href="https://www.facebook.com/Guhuza#" target="_blank" rel="noopener noreferrer" className="Share-button">
              <span className="Share-icon">FB</span> Facebook
            </a>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;