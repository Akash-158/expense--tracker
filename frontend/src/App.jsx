import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Expense from './pages/Expense';
import Income from './pages/Income';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const saveAuth = (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const ProtectedRoute = () => {
    if (!token) return <Navigate to="/login" replace />;
    return <Layout logout={logout} user={user}><Outlet context={{ token }} /></Layout>;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setAuth={saveAuth} />} />
        <Route path="/signup" element={<Signup setAuth={saveAuth} />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expenses" element={<Expense />} />
          <Route path="/incomes" element={<Income />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
