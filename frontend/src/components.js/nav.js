import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext"; 
import LogoImage from "../assets/Mylogo.png";
import "../App.css";

const Navbar = () => {
  const { user, logout } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  if (isLoginPage || isSignupPage) return null;

  return (
    <nav className="nav-container">
      {/* Logo */}
      <Link to="/" onClick={closeMobileMenu}>
        <img src={LogoImage} alt="Logo" className="Logo" />
      </Link>

      {/* Mobile hamburger */}
      <button
        className={`hamburger-menu ${isMobileMenuOpen ? "open" : ""}`}
        onClick={toggleMobileMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <ul className="nav-ul">
          <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
          <li><Link to="/pricing" onClick={closeMobileMenu}>Pricing</Link></li>
          <li><Link to="/work" onClick={closeMobileMenu}>Work</Link></li>
          <li><Link to="/support" onClick={closeMobileMenu}>Support</Link></li>
          <li><Link to="/contact" onClick={closeMobileMenu}>Contact</Link></li>
        </ul>

        <div className="nav-buttons">
          {!user ? (
            <>
              <Link to="/login" onClick={closeMobileMenu}>
                <button className="login-button">Login</button>
              </Link>
              <Link to="/signup" onClick={closeMobileMenu}>
                <button className="sign-button">Sign Up</button>
              </Link>
            </>
          ) : (
            <div className="user-info">
              <span className="user-icon">👤</span>
              <span className="user-name">Hi, {user.name}</span>
              <button
                className="logout-button"
                onClick={() => {
                  logout();
                  closeMobileMenu();
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Desktop menu */}
      <ul className="nav-ul desktop-only">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/pricing">Pricing</Link></li>
        <li><Link to="/work">Work</Link></li>
        <li><Link to="/support">Support</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      {/* Desktop buttons */}
      <div className="nav-buttons desktop-only">
        {!user ? (
          <>
            <Link to="/login"><button className="login-button">Login</button></Link>
            <Link to="/signup"><button className="sign-button">Sign Up</button></Link>
          </>
        ) : (
          <div className="user-info">
            <span className="user-icon">👤</span>
            <span className="user-name">Hi, {user.name}</span>
            <button className="logout-button" onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
