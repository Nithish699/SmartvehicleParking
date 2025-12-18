import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParkingSlots from './components/ParkingSlots';
import ParkVehicle from './components/ParkVehicle';
import ExitVehicle from './components/ExitVehicle';
import ActiveParkings from './components/ActiveParkings';
import Footer from './components/Footer';
import { getActiveParkings } from './services/api';
import './App.css';

function Dashboard() {
  const [activeParkings, setActiveParkings] = useState([]);
  const [activeTab, setActiveTab] = useState('park');
  const navigate = useNavigate();

  const refreshData = async () => {
    try {
      const parkingsResponse = await getActiveParkings();
      setActiveParkings(parkingsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>Smart Vehicle Parking System</h1>
          <button 
            className="back-to-home"
            onClick={() => navigate('/')}
          >
            ← Back to Home
          </button>
        </div>
      </header>
      
      <nav>
        <button 
          className={activeTab === 'slots' ? 'active' : ''}
          onClick={() => setActiveTab('slots')}
        >
          Available Slots
        </button>
        <button 
          className={activeTab === 'park' ? 'active' : ''}
          onClick={() => setActiveTab('park')}
        >
          Park Vehicle
        </button>
        <button 
          className={activeTab === 'exit' ? 'active' : ''}
          onClick={() => setActiveTab('exit')}
        >
          Exit Vehicle
        </button>
        <button 
          className={activeTab === 'active' ? 'active' : ''}
          onClick={() => setActiveTab('active')}
        >
          Active Parkings
        </button>
      </nav>
      
      <main>
        {activeTab === 'slots' && <section id="slots"><ParkingSlots /></section>}
        {activeTab === 'park' && <section id="park"><ParkVehicle onPark={refreshData} /></section>}
        {activeTab === 'exit' && <section id="exit"><ExitVehicle onExit={refreshData} /></section>}
        {activeTab === 'active' && <section id="active"><ActiveParkings parkings={activeParkings} /></section>}
      </main>
      <Footer onNavigate={setActiveTab} />
    </div>
  );
}

export default Dashboard;