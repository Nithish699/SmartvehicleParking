import React from 'react';
import './Footer.css';

function Footer({ onNavigate }) {
  const handleNav = (e, tab) => {
    e.preventDefault();
    if (onNavigate) return onNavigate(tab);
    const el = document.getElementById(tab);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="app-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-text">© {new Date().getFullYear()} Smart Vehicle Parking</div>
        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="#slots" onClick={(e) => handleNav(e, 'slots')}>Available Slots</a>
          <a href="#park" onClick={(e) => handleNav(e, 'park')}>Park Vehicle</a>
          <a href="#exit" onClick={(e) => handleNav(e, 'exit')}>Exit Vehicle</a>
          <a href="#active" onClick={(e) => handleNav(e, 'active')}>Active Parkings</a>
        </nav>
        <div className="footer-github">
          <a href="https://github.com/Nithish699/SmartvehicleParking" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.92.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.36-1.29-1.72-1.29-1.72-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.76.41-1.27.75-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 012.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.68.42.36.8 1.08.8 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.21.68.8.56A10.52 10.52 0 0023.5 12C23.5 5.73 18.27.5 12 .5z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;