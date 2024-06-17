import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UserList from './components/UserList';
//import Login from './components/Login';

const App: React.FC = () => {
return (
<Router>
<div className="App">
<header className="App-header">
<h1>Welcome to the Test App</h1>
<Routes>

<Route path="/" element={<UserList />} />
</Routes>
</header>
</div>
</Router>
);
};

export default App;
