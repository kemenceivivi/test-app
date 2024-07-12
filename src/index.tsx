import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Response } from 'miragejs';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';

createServer({
  routes() {
    this.namespace = 'api';
    this.post('/login', (schema, request) => {
      const { username, password } = JSON.parse(request.requestBody);
      if (username === 'admin' && password === 'password') {
        return {
          user: { id: 1, name: 'Admin' },
          token: 'fake-jwt-token',
        };
      } else {
        return new Response(401, {}, { error: 'Wrong username or password' });
      }
    });

    this.post('/logout', () => {
      return new Response(204);
    });

    this.get('/users', (schema, request) => {
      const authHeader = request.requestHeaders['Authorization'];

      if (authHeader === 'Bearer fake-jwt-token') {
        return [
          { id: 1, name: 'John Doe' },
          { id: 2, name: 'Jane Smith' },
          { id: 3, name: 'Alice Johnson' },
          { id: 4, name: 'Robert Brown' },
        ];
      } else {
        return new Response(401, {}, { error: 'not authorized' });
      }
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
