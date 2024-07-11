import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useTokenService } from './useTokenService';
import { useApi } from './useApi';
import { toast } from 'react-toastify';

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

      const data = await sendPost<{username: string, password: string}, { token: string, user: { id: number, name: string } }>(
        '/api/login',
        { username, password }
      );

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
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
