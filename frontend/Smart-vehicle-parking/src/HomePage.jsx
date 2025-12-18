import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="background-overlay"></div>
      
      <div className="home-content">
        {/* Header with Logo */}
        <header className="home-header">
          <div className="logo-section">
            <Logo size="large" onClick={() => navigate('/dashboard')} />
            <div className="header-actions">
              <button 
                className="demo-btn"
                onClick={() => navigate('/dashboard')}
              >READY TO PARK?    
              </button>
            </div>
          </div>
          
          <div className="hero-section">
            <h1 className="main-title">
              Intelligent <span className="highlight">Parking</span> Management
            </h1>
            <p className="tagline">
              Smart solutions for efficient urban parking with real-time tracking and automated systems
            </p>
          </div>
        </header>
        
        <main className="home-main">
          {/* Key Features */}
          <div className="features-section">
            <h2 className="section-title">Key Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon-container">
                  <div className="feature-icon-bg" style={{ background: 'linear-gradient(135deg, #2ecc71, #27ae60)' }}>
                    <span className="feature-icon">🚘</span>
                  </div>
                </div>
                <h3>Real-time Slot Tracking</h3>
                <p>Monitor parking space availability in real-time with color-coded status indicators</p>
              </div>
              
              
              
              <div className="feature-card">
                <div className="feature-icon-container">
                  <div className="feature-icon-bg" style={{ background: 'linear-gradient(135deg, #9b59b6, #8e44ad)' }}>
                    <span className="feature-icon">💳</span>
                  </div>
                </div>
                <h3>Automated Billing</h3>
                <p>Seamless payment processing with multiple payment options and digital receipts</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon-container">
                  <div className="feature-icon-bg" style={{ background: 'linear-gradient(135deg, #e74c3c, #c0392b)' }}>
                    <span className="feature-icon">📊</span>
                  </div>
                </div>
                <h3>Smart Analytics</h3>
                <p>Comprehensive reporting and data analytics for parking space optimization</p>
              </div>
              <div className="feature-card">
  <div className="feature-icon-container">
    <div className="feature-icon-bg" style={{ background: 'linear-gradient(135deg, #f39c12, #e67e22)' }}>
      <span className="feature-icon">📋</span>
    </div>
  </div>
  <h3>Active Parking Management</h3>
  <p>View and manage all currently parked vehicles with real-time status updates</p>
</div>

<div className="feature-card">
  <div className="feature-icon-container">
    <div className="feature-icon-bg" style={{ background: 'linear-gradient(135deg, #1abc9c, #16a085)' }}>
      <span className="feature-icon">✅</span>
    </div>
  </div>
  <h3>Quick Check-out</h3>
  <p>Fast vehicle exit process with automatic calculation of parking duration</p>
</div>

<div className="feature-card">
  <div className="feature-icon-container">
    <div className="feature-icon-bg" style={{ background: 'linear-gradient(135deg, #34495e, #2c3e50)' }}>
      <span className="feature-icon">🔄</span>
    </div>
  </div>
  <h3>Real-time Updates</h3>
  <p>Automatic refresh of parking data every 5 seconds for latest availability</p>
</div>
            </div>
          </div>
          
          {/* How It Works */}
          <div className="how-it-works">
            <h2 className="section-title">How It Works</h2>
            <div className="steps-container">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Check Availability</h3>
                  <p>View real-time parking space availability on interactive floor maps</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Park Vehicle</h3>
                  <p>Enter vehicle details and get assigned to the nearest available spot</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Secure Parking</h3>
                  <p>Your parking session is monitored and secured with automated systems</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Easy Exit</h3>
                  <p>Automated billing and seamless exit process with digital receipts</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="cta-section">
            <div className="cta-content">
              <h2>Ready to Experience Smart Parking?</h2>
              <p>Join thousands of users who have revolutionized their parking experience with our intelligent system</p>
              
              <div className="cta-buttons">
                <button 
                  className="primary-cta"
                  onClick={() => navigate('/dashboard')}
                >
                  <Logo size="small" />
                  <span>Launch Dashboard</span>
                </button>
                
                <button 
                  className="secondary-cta"
                  onClick={() => alert('Coming soon!')}
                >
                  Watch Demo Video
                </button>
              </div>
              
            
            </div>
          </div>
        </main>
        
        <footer className="home-footer">
          <div className="footer-content">
            <Logo size="small" />
            <p className="copyright">© {new Date().getFullYear()} SmartPark Parking System. All rights reserved.</p>
            <div className="footer-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#contact">Contact Us</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;