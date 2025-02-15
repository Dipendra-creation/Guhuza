'use client';

import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import axios from 'axios';

interface UserProfile {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  // Add additional fields if needed (e.g., image, scores, badges)
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  return (
    <ProtectedRoute>
      <div className="profile-container">
        <h1>{profile.username}'s Profile</h1>
        <p><strong>Email:</strong> {profile.email}</p>
        <p>
          <strong>Name:</strong> {profile.firstName} {profile.lastName}
        </p>
        {/* You can add additional details here (e.g., scores, badges, etc.) */}
      </div>
    </ProtectedRoute>
  );
};

export default Profile;