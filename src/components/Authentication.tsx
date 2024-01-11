import React, { useEffect } from 'react';
import Login from './Login';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Register from './Register';

const Authentication = () => {
  const isLoggedIn = false;
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Authentication;
