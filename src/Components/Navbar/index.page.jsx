import React, { useContext, useEffect, useState } from "react";
import { ReactComponent as AutoAcadLogo } from "../../assets/Logo/AutoAcadLogo.svg";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import AuthContext from "../../context/AuthContext";

export default function Navbar() {
  const url = window.location.pathname;
  const { logout } = useContext(AuthContext);
  const { auth } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(auth.isAuthenticated);
  }, [auth]);

  const handleLogout=()=>{
    logout();
  }
  return (
    <nav className="navbar">
      <AutoAcadLogo className="navbar-logo" />
      <div className={`navbar-links ${isAuthenticated ? "navbar-links-auth" : ""}`}>
        {url === "/" ? (
          <ScrollLink to="home" className="navbar-link" smooth={true}>
            Home
          </ScrollLink>
        ) : (
          <Link to="/" className="navbar-link">
            Home
          </Link>
        )}
        <ScrollLink to="about" className="navbar-link" smooth={true}>
          About
        </ScrollLink>
        {isAuthenticated && (
          <Link to="/user/dashboard" className="navbar-link">
            Dashboard
          </Link>
        )}
        {isAuthenticated ? (
          <button 
            className="navbar-link-sign-in"
            onClick={() => {
              handleLogout();
            }}
          >
            Sign Out
          </button>
        ) : (
          <Link to="/sign-in" className="navbar-link-sign-in">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
