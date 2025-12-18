import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Background with overlay */}
      <div className="background-overlay"></div>
      
      <div className="home-content">
        <header className="home-header">
          <h1 className="main-title">Smart Vehicle Parking System</h1>
          <p className="tagline">Intelligent Parking Solutions for Modern Cities</p>
        </header>
        
        <main className="home-main">
          <div className="features-section">
            <div className="feature-card">
              <div className="feature-icon">🚗</div>
              <h3>Smart Parking</h3>
              <p>Real-time slot availability tracking with automated parking management</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📍</div>
              <h3>Live Tracking</h3>
              <p>Monitor parking spaces in real-time with interactive floor maps</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⏱️</div>
              <h3>Time Management</h3>
              <p>Automated billing based on exact parking duration</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Analytics Dashboard</h3>
              <p>Comprehensive reports and occupancy statistics</p>
            </div>
          </div>
          
          <div className="stats-section">
            <div className="stat-item">
              <h2>24/7</h2>
              <p>Operation</p>
            </div>
            <div className="stat-item">
              <h2>99%</h2>
              <p>Accuracy Rate</p>
            </div>
            <div className="stat-item">
              <h2>500+</h2>
              <p>Active Users</p>
            </div>
            <div className="stat-item">
              <h2>Instant</h2>
              <p>Check-in/out</p>
            </div>
          </div>
          
          <div className="cta-section">
            <h2>Experience Smart Parking Today</h2>
            <p>Join thousands of users who've simplified their parking experience</p>
            <button 
              className="enter-dashboard-btn"
              onClick={() => navigate('/dashboard')}
            >
              Enter Dashboard
            </button>
            
            
          </div>
        </main>
      </div>
    </div>
  );
}

export default HomePage;