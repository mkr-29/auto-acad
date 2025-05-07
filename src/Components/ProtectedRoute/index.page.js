// src/Components/ProtectedRoute/index.page.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { auth, loading } = useContext(AuthContext); // Get authentication state

  // Wait for AuthContext to finish loading
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or skeleton
  }

  // If not authenticated, redirect to login
  if (!auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  // If authenticated, render the children (protected page)
  return (
    <div>
      {children}
    </div>
  );
};

export default ProtectedRoute;
