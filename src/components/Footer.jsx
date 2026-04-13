/**
 * src/components/Footer.jsx
 *
 * Simple footer with attribution.
 */

import React from 'react';
import '../styles/Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="container footer__inner">
      <p className="footer__copy">
        © {new Date().getFullYear()} <span>CryptoVault</span>. All rights reserved.
      </p>
      <p className="footer__credit">
        Data provided by{' '}
        <a
          href="https://www.coingecko.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          CoinGecko API
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
