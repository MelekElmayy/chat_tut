import React from "react";
import { LogOut } from "react-feather";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user, handleUserLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await handleUserLogout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div id="header--wrapper">
      {user && (
        <>
          <span>Welcome, {user.name || user.email}</span>
          <LogOut 
            className="header--link" 
            onClick={handleLogout}
            size={20}
          />
        </>
      )}
    </div>
  );
}

export default Header;