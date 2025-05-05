import React from 'react';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const { handleUserLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await handleUserLogout();
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="btn btn--logout">
      Logout
    </button>
  );
}

export default LogoutButton;