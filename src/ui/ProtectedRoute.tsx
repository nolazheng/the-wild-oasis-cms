import { useUser } from '@/features/authentication/hooks/useUser';
import React, { useEffect } from 'react';
import Spinner from './Spinner';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = useUser();

  // Redirect to login page if user is not authenticated.
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Show spinner while loading user data.
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (!isAuthenticated) return null;
  return children;
}

export default ProtectedRoute;
