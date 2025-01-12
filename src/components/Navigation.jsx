import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../style/Navigation.css';
import name from '../images/logo-white.png'

const Navbar = () => {
  const [isMobile, setMobile] = useState(false);

  const toggleMobileMenu = () => {
    setMobile(!isMobile);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo"><img src={name} alt="name" /></div>

        <div className={`navbar-links ${isMobile ? 'mobile' : ''}`}>
          {/* <Link to="/users">Users</Link> */}
          <Link to="/orders">Orders</Link>
          {/* <Link to="/orders-other">Orders-Other-Place</Link> */}
          {/* <Link to="/result">Send Results</Link> */}
          {/* <Link to="/results-sent">Results sent</Link> */}
          <Link to="/contact">Contact</Link>
        </div>

        <div className="navbar-toggle" onClick={toggleMobileMenu}>
          ☰
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

