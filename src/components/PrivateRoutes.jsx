import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { userAuth } from '../utils/AuthContext'



const PrivateRoutes = () => {
  const {user} = userAuth()

  return <>{user ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default PrivateRoutes;
