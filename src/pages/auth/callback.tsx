import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@workos-inc/authkit-react';
import { Container, CircularProgress } from '@mui/material';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    console.log('Callback state:', { user, isLoading });
    
    if (!isLoading && user) {
      console.log('Redirecting to dashboard...');
      navigate('/', { replace: true });
    }
  }, [isLoading, user, navigate]);

  return (
    <Container sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh' 
    }}>
      <CircularProgress />
    </Container>
  );
}