'use client';

import { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token, redirect to sign-in page
      navigate('/sign-in');
    }
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;