import React, { useContext, useEffect, useState } from "react";
import { ReactComponent as AutoAcadLogo } from "../../assets/Logo/AutoAcadLogo.svg";
import "./Navbar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { scroller, Link as ScrollLink } from "react-scroll";
import AuthContext from "../../context/AuthContext";
import { appRoutes } from "../../routes/appRoutes";

export default function Navbar() {
  const url = window.location.pathname;
  const { logout } = useContext(AuthContext);
  const { auth } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(auth.isAuthenticated);
  }, [auth]);

  const handleLogout = () => {
    logout();
  };

  const handleNavigateAndScroll = (section) => {
    if (location.pathname !== appRoutes.home) {
      // Navigate to the home page and scroll after navigation
      navigate("/");
      setTimeout(() => {
        scroller.scrollTo(section, {
          smooth: true,
          duration: 500,
          // offset: -50, // Adjust offset for fixed headers, if any
        });
      }, 100); // Wait briefly for the navigation to complete
    } else {
      // Directly scroll if already on the home page
      scroller.scrollTo(section, {
        smooth: true,
        duration: 500,
        // offset: -50,
      });
    }
  };
  return (
    <nav className="navbar">
      <AutoAcadLogo className="navbar-logo" />
      <div
        className={`navbar-links ${isAuthenticated ? "navbar-links-auth" : ""}`}
      >
        {/* Home */}
        {url === appRoutes.home ? (
          <ScrollLink
            to="home"
            className={`navbar-link`}
            smooth={true}
            spy={true} // React Scroll's spy
            activeClass="navbar-link-active" // Add active class automatically
            // offset={-70}
          >
            Home
          </ScrollLink>
        ) : (
          <Link to={appRoutes.home} className="navbar-link">
            Home
          </Link>
        )}

        {/* About */}
        {url === appRoutes.home ? (
          <ScrollLink
            to="about"
            className="navbar-link"
            smooth={true}
            spy={true} // React Scroll's spy
            activeClass="navbar-link-active" // Add active class automatically
          >
            About
          </ScrollLink>
        ) : (
          <div
            to="about"
            className="navbar-link"
            smooth={true}
            onClick={() => handleNavigateAndScroll("about")}
          >
            About
          </div>
        )}

        {/* Dashboard */}
        {isAuthenticated && (
          <Link to={appRoutes.dashboard} className={`navbar-link ${url === appRoutes.dashboard && "navbar-link-active"}`}>
            Dashboard
          </Link>
        )}

        {/* Sign In/Out */}
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
          <Link to={appRoutes.signIn} className="navbar-link-sign-in">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
