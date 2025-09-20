import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearAuth } from '../utils/auth';
import name from '../images/logo-white.png';

const Navbar = () => {
  const [isMobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileOpen(!isMobileOpen);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const handleLogout = () => {
    clearAuth();
    navigate('/');
    closeMobileMenu();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="nav-modern">
      <div className="nav-container">
        <Link to="/orders" className="nav-logo" onClick={closeMobileMenu}>
          <img src={name} alt="Co-Lab by Acubed" />
        </Link>

        <div className={`nav-links ${isMobileOpen ? 'mobile-open' : ''}`}>
          <Link
            to="/orders"
            className={`nav-link ${isActive('/orders') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Orders
          </Link>
          <Link
            to="/orders-other"
            className={`nav-link ${isActive('/orders-other') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Other Orders
          </Link>
          <Link
            to="/users"
            className={`nav-link ${isActive('/users') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Users
          </Link>
          <Link
            to="/view-result"
            className={`nav-link ${isActive('/view-result') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Results
          </Link>
          <a
            href="https://www.acubbed.com/#contact-us"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            onClick={closeMobileMenu}
          >
            Contact
          </a>
          <button
            onClick={handleLogout}
            className="btn btn-secondary btn-sm"
            style={{ marginLeft: 'var(--spacing-2)' }}
          >
            Logout
          </button>
        </div>

        <button className="nav-toggle" onClick={toggleMobileMenu} aria-label="Toggle navigation menu">
          <span style={{ display: 'block', fontSize: '1.5rem' }}>
            {isMobileOpen ? '✕' : '☰'}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

