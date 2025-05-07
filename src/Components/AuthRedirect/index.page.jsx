import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const AuthRedirect = ({ children }) => {
  const { auth } = useContext(AuthContext);

  // If user is authenticated, redirect to dashboard
  if (auth.isAuthenticated) {
    return <Navigate to="/user/dashboard" replace />;
  }

  // If not authenticated, render the children (auth pages)
  return children;
};

export default AuthRedirect; 