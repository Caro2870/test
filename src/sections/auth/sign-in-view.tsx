import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@workos-inc/authkit-react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { Iconify } from 'src/components/iconify';

export function SignInView() {
  const navigate = useNavigate();
  const { signIn, isLoading, user } = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      console.log('Sign in view state:', {  user });

      console.log('User authenticated, redirecting to dashboard...');
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleSignIn = async () => {
    try {
      console.log('Starting sign in process...');
      await signIn();
    } catch (err) {
      console.error('Sign in error:', err);
      setError('Authentication failed. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <LoadingButton loading variant="contained">
          Loading...
        </LoadingButton>
      </Box>
    );
  }

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" color="text.secondary">
          Don&apos;t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }}>
            Get started
          </Link>
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <LoadingButton
        fullWidth
        size="large"
        type="button"
        variant="contained"
        color="inherit"
        onClick={handleSignIn}
        loading={isLoading}
      >
        Sign in with WorkOS
      </LoadingButton>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>

      <Box gap={2} display="flex" justifyContent="center">
        <LoadingButton
          size="large"
          color="inherit"
          variant="outlined"
          onClick={() => handleSignIn()}
          loading={isLoading}
          startIcon={<Iconify icon="logos:google-icon" />}
        >
          Google
        </LoadingButton>

        <LoadingButton
          size="large"
          color="inherit"
          variant="outlined"
          onClick={() => handleSignIn()}
          loading={isLoading}
          startIcon={<Iconify icon="eva:github-fill" />}
        >
          GitHub
        </LoadingButton>
      </Box>
    </>
  );
}