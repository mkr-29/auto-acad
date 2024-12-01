import React from "react";
import { ReactComponent as AutoAcadLogo } from "../../assets/Logo/AutoAcadLogo.svg";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

export default function Navbar() {
  const url = window.location.pathname;
  return (
    <nav className="navbar">
      <AutoAcadLogo className="navbar-logo" />
      <div className="navbar-links">
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
        {url === "/user/dashboard" ? (
          <Link to="/sign-in" className="navbar-link-sign-in">
            Sign Out
          </Link>
        ) : (
          <Link to="/sign-in" className="navbar-link-sign-in">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
