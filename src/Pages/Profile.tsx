import React, { useEffect, useRef, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import axios from 'axios';
import html2canvas from 'html2canvas';
import '../styles/profile.css';
import GP from '../assets/GP.png';

// Import social media icons from react-icons
import { 
  FaInstagram, FaFacebookF, FaLinkedinIn, 
  FaEdit, FaUser, FaEnvelope 
} from 'react-icons/fa';

// Import the badge checker component
import CheckBadgesOnLoad from '../CheckBadgesOnLoad';

interface Badge {
  id: number;
  name: string;
  description?: string;
  image: string;
  awardedAt: string;
}

interface UserBadge {
  badge: Badge;
}

interface UserProfile {
  id: number;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  highestLevelCompleted: number;
  createdAt: string;
  userBadges?: UserBadge[];
  rank?: number;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  // Edit mode for personal info
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
  });

  const profileRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper: Convert relative image path to absolute URL with cache busting
  const getImageUrl = (path?: string): string | null => {
    if (!path) return null;
    const parts = path.split('/');
    const filename = parts[parts.length - 1];
    return `http://localhost:5001/uploads/${filename}?t=${new Date().getTime()}`;
  };

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      setError("User not authenticated");
      return;
    }
    try {
      const response = await axios.get('http://localhost:5001/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Profile fetched:", response.data);
      setProfile(response.data.user);
      setEditForm({
        firstName: response.data.user.firstName || '',
        lastName: response.data.user.lastName || '',
      });
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

  // Capture screenshot for sharing
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
        alert(`Your screenshot has been downloaded. Please share it on ${platform}.`);
      }, 500);
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };

  // Trigger file selection for profile picture update
  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('User not authenticated');

      const response = await axios.post(
        'http://localhost:5001/api/profile/image',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Updated profile response:', response.data);
      setProfile(response.data.user);
    } catch (err: any) {
      console.error('Error updating profile picture:', err);
      setError('Error updating profile picture');
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('User not authenticated');

      const response = await axios.put(
        'http://localhost:5001/api/profile/edit',
        { ...editForm },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Profile updated:', response.data);
      setProfile(response.data.user);
      setIsEditing(false);
    } catch (err: any) {
      console.error('Error updating profile information:', err);
      setError('Error updating profile information');
    }
  };

  const handleCancelEdit = () => {
    if (profile) {
      setEditForm({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
      });
    }
    setIsEditing(false);
  };

  const toggleEditMode = () => {
    setIsEditing(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

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
        {/* Trigger badge checks */}
        <CheckBadgesOnLoad profile={profile} />

        {/* Hidden file input for profile image change */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {/* ===== Header Section ===== */}
        <div className="profile-header">
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
              <span className="flex items-center space-x-2">
                <img src={GP} className="h-5 w-5" alt="GP Icon" />
                <span>{profile.score} GP</span>
              </span>
              <p className="bio">
                Hello, I'm {profile.firstName || 'N/A'} {profile.lastName || 'N/A'} (aka {profile.username}).
                <br />
                And I am currently looking for a job.
              </p>
              <button className="change-profile-btn" onClick={handleProfilePictureClick}>
                Change Profile Picture
              </button>
            </div>
          </div>
        </div>

        {/* ===== Stats Row ===== */}
        <div className="stats-row">
          <div className="stats-item">
            <span className="stat-title"><b>Joined</b></span>
            <span className="stat-value">
              {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
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

        {/* ===== Personal Information Section ===== */}
        <div className="personal-info-section">
          <div className="section-header">
            <h3><b>Personal Information</b></h3>
            {!isEditing && (
              <button className="edit-profile-btn" onClick={toggleEditMode}>
                <FaEdit className="edit-icon" /> Edit Info
              </button>
            )}
          </div>
          {isEditing ? (
            <div className="edit-form">
              <div className="info-item">
                <label>
                  <FaUser /> First Name:
                  <input
                    type="text"
                    name="firstName"
                    value={editForm.firstName}
                    onChange={handleEditChange}
                  />
                </label>
              </div>
              <div className="info-item">
                <label>
                  <FaUser /> Last Name:
                  <input
                    type="text"
                    name="lastName"
                    value={editForm.lastName}
                    onChange={handleEditChange}
                  />
                </label>
              </div>
              <div className="info-item">
                <label>
                  <FaEnvelope /> Email:
                  <input type="email" value={profile.email} readOnly />
                </label>
              </div>
              <div className="form-buttons">
                <button className="save-btn" onClick={handleSaveChanges}>
                  Save Changes
                </button>
                <button className="cancel-btn" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="info-items">
              <div className="info-item readonly">
                <span className="info-label"><FaUser /> First Name:</span>
                <span className="info-value">{profile.firstName || 'N/A'}</span>
              </div>
              <div className="info-item readonly">
                <span className="info-label"><FaUser /> Last Name:</span>
                <span className="info-value">{profile.lastName || 'N/A'}</span>
              </div>
              <div className="info-item readonly">
                <span className="info-label"><FaEnvelope /> Email:</span>
                <span className="info-value">{profile.email}</span>
              </div>
            </div>
          )}
        </div>

        {/* ===== Badges Section ===== */}
        <div className="badges-section">
          <h3>Badges</h3>
          <div className="badges-list">
            {profile.userBadges && profile.userBadges.length > 0 ? (
              profile.userBadges.map((userBadge) => (
                <div key={userBadge.badge.id} className="badge-item">
                  <img src={userBadge.badge.image} alt={userBadge.badge.name} />
                  <p>{userBadge.badge.name}</p>
                  <span>{userBadge.badge.description}</span>
                </div>
              ))
            ) : (
              <p>No badges yet.</p>
            )}
          </div>
        </div>

        {/* ===== Action Buttons ===== */}
        <div className="action-buttons">
          <button className="sign-out-btn" onClick={handleSignOut}>
            Sign out
          </button>
          <button className="delete-account-btn" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
      </div>

      {/* ===== Footer Section ===== */}
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
        <p>© 2025 Guhuza. All rights reserved</p>
      </footer>
    </ProtectedRoute>
  );
};

export default Profile;