import React from 'react';
import './Logo.css';

function Logo({ size = 'medium', onClick }) {
  return (
    <div className={`logo-container ${size}`} onClick={onClick}>
      <div className="logo-icon">
        <div className="parking-p">
          <div className="p-circle">
            <span className="p-letter">P</span>
          </div>
        </div>
        <div className="car-icon">🚗</div>
      </div>
      <div className="logo-text">
        <span className="logo-main">SmartPark</span>
        <span className="logo-sub">Intelligent Parking</span>
      </div>
    </div>
  );
}

export default Logo;