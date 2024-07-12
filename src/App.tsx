import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UserList from './components/UserList';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to the Test App</h1>
          <Routes>
            <Route path="/" element={<PrivateRoute component={UserList} />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </header>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
