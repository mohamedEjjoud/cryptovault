/**
 * src/components/Navbar.jsx
 *
 * Top navigation bar with logo, nav links, live indicator, and theme toggle.
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="container navbar__inner">

        {/* Logo */}
        <NavLink to="/" className="navbar__logo" aria-label="CryptoVault Home">
          <div className="navbar__logo-icon" aria-hidden="true">⬡</div>
          <span className="navbar__logo-text">
            Crypto<span>Vault</span>
          </span>
        </NavLink>

        {/* Navigation links */}
        <div className="navbar__links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `navbar__link ${isActive ? 'active' : ''}`
            }
          >
            Markets
          </NavLink>

          {/* Live data pulse indicator */}
          <div className="navbar__live" aria-label="Live data">
            <div className="navbar__live-dot" aria-hidden="true" />
            LIVE
          </div>

          {/* Dark / Light mode toggle */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? '☀' : '☽'}
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
