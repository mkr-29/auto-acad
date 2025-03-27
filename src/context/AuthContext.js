import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create the context
const AuthContext = createContext();

// Provide the context to the app
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if a token exists on app load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");

    if (token && user) {
      setAuth({
        isAuthenticated: true,
        user: JSON.parse(user),
      });
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (token, user) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuth({ isAuthenticated: true, user });
    navigate("/user/dashboard");
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setAuth({ isAuthenticated: false, user: null });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Export the context
export default AuthContext;
