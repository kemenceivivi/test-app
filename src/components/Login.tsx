import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useTokenService } from './useTokenService';
import { useApi } from './useApi';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import CustomButton from './StyledButton';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const { setToken } = useTokenService();
  const { sendPost } = useApi();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    try {
      const data = await sendPost<
        { username: string; password: string },
        { token: string; user: { id: number; name: string } }
      >('/api/login', { username, password });

      setToken(data.token);
      login();
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
      }
    }
  };

  return (
    <div>
      <Box display={'flex'} flexDirection={'column'} gap={2}>
        <TextField
          id="username"
          label="Username"
          variant="filled"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ width: 300, bgcolor: 'background.paper' }}
        />

        <TextField
          id="password"
          label="Password"
          variant="filled"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: 300, bgcolor: 'background.paper' }}
        />

        <CustomButton onClick={handleLogin}>Login</CustomButton>
      </Box>
    </div>
  );
};

export default Login;
