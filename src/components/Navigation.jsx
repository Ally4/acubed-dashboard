// Navbar.js

import React, { useState } from 'react';
import '../style/Navigation.css';

const Navbar = () => {
  const [isMobile, setMobile] = useState(false);

  const toggleMobileMenu = () => {
    setMobile(!isMobile);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">Your Logo</div>

        <div className={`navbar-links ${isMobile ? 'mobile' : ''}`}>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="navbar-toggle" onClick={toggleMobileMenu}>
          ☰
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
