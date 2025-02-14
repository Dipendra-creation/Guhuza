'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token, redirect to sign-in page
      router.push('/sign-in');
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;