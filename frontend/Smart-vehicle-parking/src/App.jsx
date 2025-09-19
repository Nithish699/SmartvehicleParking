import React, { useState, useEffect } from 'react';
import ParkingSlots from './components/ParkingSlots';
import ParkVehicle from './components/ParkVehicle';
import ExitVehicle from './components/ExitVehicle';
import ActiveParkings from './components/ActiveParkings';
import { getActiveParkings } from './services/api';
import './App.css';

function App() {
  const [activeParkings, setActiveParkings] = useState([]);
  const [activeTab, setActiveTab] = useState('slots');

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
    const interval = setInterval(refreshData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Smart Vehicle Parking System</h1>
      </header>
      
      <nav>
        <button onClick={() => setActiveTab('slots')}>Available Slots</button>
        <button onClick={() => setActiveTab('park')}>Park Vehicle</button>
        <button onClick={() => setActiveTab('exit')}>Exit Vehicle</button>
        <button onClick={() => setActiveTab('active')}>Active Parkings</button>
      </nav>
      
      <main>
        {activeTab === 'slots' && <ParkingSlots />}
        {activeTab === 'park' && <ParkVehicle onPark={refreshData} />}
        {activeTab === 'exit' && <ExitVehicle onExit={refreshData} />}
        {activeTab === 'active' && <ActiveParkings parkings={activeParkings} />}
      </main>
    </div>
  );
}

export default App;