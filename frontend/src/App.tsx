import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Login from './components/Login';
import TaskList from './components/TaskList';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Register from './components/Register';

const App: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return token ? <><Navbar />{children}</> : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TaskList />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/tasks" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
