import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@workos-inc/authkit-react';
import { Box, CircularProgress } from '@mui/material';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoading, user } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute state:', { isLoading, user, path: location.pathname });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }

  return children;
}

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isLoading, user } = useAuth();
  const location = useLocation();

  console.log('PublicRoute state:', { isLoading, user, path: location.pathname });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}