// src/pages/Profile.tsx

import React, { useEffect, useRef, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import axios from 'axios';
import html2canvas from 'html2canvas';
import '../styles/profile.css';
import GP from '../assets/GP.png';

// Import social media icons from react-icons
import { 
  FaInstagram, FaFacebookF, FaLinkedinIn, 
  FaEdit, FaUser,FaEnvelope,FaPhone, FaMapMarkerAlt
 } from 'react-icons/fa';


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

  // Additional fields if needed
  contactNo?: string;
  address?: string;
  rank?: number;
  joinedAt?: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const profileRef = useRef<HTMLDivElement>(null);

  // Helper: Convert relative image path to absolute URL
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
    const interval = setInterval(fetchProfile, 30000);
    return () => clearInterval(interval);
  }, []);

  // Capture screenshot & prompt user to share
  const handleShareScreenshot = async (platform: 'facebook' | 'instagram' | 'linkedin') => {
    if (!profileRef.current) return;
    try {
      const canvas = await html2canvas(profileRef.current, { useCORS: true });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'profile.png';
      link.click();

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

  // Example sign out
  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  // Example delete account
  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      await axios.delete('http://localhost:5001/api/users/delete', {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error deleting account:', error);
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
      <div className="profile-container" ref={profileRef}>
        {/* ===== Header Section ===== */}
        <div className="profile-header">
          {/* Left side: Profile Picture & Basic Info */}
          <div className="header-left">
            <div className="profile-picture-wrapper">
              {imageUrl ? (
                <img src={imageUrl} alt="Profile" crossOrigin="anonymous" />
              ) : (
                <div className="no-image">No Image</div>
              )}
            </div>
            <div className="basic-info">
              <h2>{profile.username}</h2>
              <span className="flex items-center space-x-2 ">
  <img src={GP} className="h-5 w-5" alt="GP Icon" />
  <span>{profile.score} GP</span>
</span>
              <p className="bio">
              Hello, I'm {profile.firstName} {profile.lastName} (aka {profile.username}).
              <p> And i am currently looking for Job</p>
              </p>
              <button className="change-profile-btn">Change Profile</button>

            </div>
          </div>
        </div>

        {/* ===== Stats Row ===== */}
        <div className="stats-row">
          <div className="stats-item">
            <span className="stat-title"><b>Joined</b></span>
            <span className="stat-value">
              {profile.joinedAt
                ? new Date(profile.joinedAt).toLocaleDateString()
                : 'N/A'}
            </span>
          </div>
          <div className="stats-item">
            <span className="stat-title">Rank</span>
            <span className="stat-value">{profile.rank || 'N/A'}</span>
          </div>
          <div className="stats-item">
            <span className="stat-title">Correct Answer</span>
            <span className="stat-value">{profile.correctAnswers}</span>
          </div>
          <div className="stats-item">
            <span className="stat-title">Wrong Answer</span>
            <span className="stat-value">{profile.wrongAnswers}</span>
          </div>
          <div className="stats-item">
            <span className="stat-title">Highest Level</span>
            <span className="stat-value">{profile.highestLevelCompleted}</span>
          </div>
          <div className="stats-item">
            <span className="stat-title">Status</span>
            <span className="stat-value">Job Seeker</span>
          </div>
        </div>

   {/* ===== Personal Information ===== */}
<div className="personal-info-section">
  <div className="section-header">
    <h3><b>Personal Information</b></h3>
    <button className="edit-profile-btn">
      <FaEdit className="edit-icon" /> Edit Info
    </button>
  </div>
  <div className="info-items">
    <div className="info-item">
      <span className="info-label"><FaUser  /> First Name:</span>
      <span className="info-value">{profile.firstName}</span>
    </div>
    <div className="info-item">
      <span className="info-label"><FaUser  /> Last Name:</span>
      <span className="info-value">{profile.lastName}</span>
    </div>
    <div className="info-item">
      <span className="info-label"><FaEnvelope /> Email:</span>
      <span className="info-value">{profile.email}</span>
    </div>
    <div className="info-item">
      <span className="info-label"><FaPhone /> Contact No:</span>
      <span className="info-value">{profile.contactNo || 'N/A'}</span>
    </div>
    <div className="info-item">
      <span className="info-label"><FaMapMarkerAlt /> Address:</span>
      <span className="info-value">{profile.address || 'N/A'}</span>
    </div>
  </div>
</div>


        {/* ===== Badges Section ===== */}
        <div className="badges-section">
          <h3>Badges</h3>
          <div className="badges-list">
            {profile.badges.length > 0 ? (
              profile.badges.map((badge) => (
                <div key={badge.id} className="badge-item">
                  <img src={badge.image} alt={badge.name} />
                  <p>{badge.name}</p>
                </div>
              ))
            ) : (
              <p>No badges yet.</p>
            )}
          </div>
          
        </div>

        {/* ===== Action Buttons (Sign Out & Delete) ===== */}
        <div className="action-buttons">
          <button className="sign-out-btn" onClick={handleSignOut}>
            Sign out
          </button>
          <button className="delete-account-btn" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
      </div>
              {/* ===== Footer Section with Share Profile ===== */}
<footer className="profile-footer">
  <div className="share-buttons">
    <button onClick={() => handleShareScreenshot('instagram')}>
      <FaInstagram className="Share-icon" />
    </button>
    <button onClick={() => handleShareScreenshot('facebook')}>
      <FaFacebookF className="Share-icon" />
    </button>
    <button onClick={() => handleShareScreenshot('linkedin')}>
      <FaLinkedinIn className="Share-icon" />
    </button>
  </div>
  <p>© 2023 YourApp. All rights reserved</p>
</footer>
    </ProtectedRoute>
  );
};

export default Profile;
