import React, { useState, useEffect } from 'react';
import { parkVehicle, getAvailableSlots, getAvailableSlotsByType } from '../services/api';

const ParkVehicle = ({ onPark }) => {
  const [licensePlate, setLicensePlate] = useState('');
  const [vehicleType, setVehicleType] = useState('CAR');
  const [slotNumber, setSlotNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Parking slots state
  const [slots, setSlots] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loadingSlots, setLoadingSlots] = useState(true);

  // Fetch available slots
  const fetchSlots = async (type = 'ALL') => {
    try {
      setLoadingSlots(true);
      let response;
      if (type === 'ALL') {
        response = await getAvailableSlots();
      } else {
        response = await getAvailableSlotsByType(type);
      }
      setSlots(response.data);
    } catch (error) {
      console.error('Error fetching slots:', error);
      setMessage({ type: 'error', text: 'Failed to load parking slots' });
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    fetchSlots(filter);
  }, [filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSlotSelect = (slot) => {
    if (!slot.isAvailable) return; // Don't select occupied slots
    
    setSlotNumber(slot.slotNumber);
    
    // Auto-select appropriate vehicle type based on slot type if not already set
    if (vehicleType === 'CAR') {
      if (slot.slotType === 'PREMIUM') {
        setVehicleType('CAR'); // Premium slots are typically for cars
      } else if (slot.slotType === 'HANDICAP') {
        // Handicap slots can be for any vehicle type
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setMessage('');
    
    try {
      await parkVehicle(licensePlate, vehicleType, slotNumber);
      setMessage({ type: 'success', text: 'Vehicle parked successfully!' });
      setLicensePlate('');
      setSlotNumber('');
      onPark();
      fetchSlots(filter); // Refresh the slots after parking
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Error parking vehicle: ' + (error.response?.data?.message || error.message) 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="park-vehicle-container">
      <h2>Park Vehicle</h2>
      
      <div className="parking-form-and-slots">
        {/* Parking Form */}
        <div className="parking-form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>License Plate:</label>
              <input
                type="text"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
                required
                disabled={isProcessing}
                placeholder="e.g., ABC123"
              />
            </div>
            <div className="form-group">
              <label>Vehicle Type:</label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                disabled={isProcessing}
              >
                <option value="CAR">Car</option>
                <option value="MOTORCYCLE">Motorcycle</option>
                <option value="TRUCK">Truck</option>
              </select>
            </div>
            <div className="form-group">
              <label>Selected Slot:</label>
              <input
                type="text"
                value={slotNumber}
                onChange={(e) => setSlotNumber(e.target.value.toUpperCase())}
                required
                disabled={isProcessing}
                placeholder="Click on a slot below"
                className="selected-slot-input"
              />
            </div>
            <button type="submit" disabled={isProcessing || !slotNumber}>
              {isProcessing ? 'Processing...' : 'Park Vehicle'}
            </button>
          </form>
          {message && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}
        </div>

        {/* Parking Slots Display */}
        <div className="parking-slots-section">
          <h3>Select a Parking Slot</h3>
          
          <div className="slot-filters">
            <button 
              className={`filter-btn ${filter === 'ALL' ? 'active' : ''}`}
              onClick={() => handleFilterChange('ALL')}
            >
              All Slots
            </button>
            <button 
              className={`filter-btn ${filter === 'STANDARD' ? 'active' : ''}`}
              onClick={() => handleFilterChange('STANDARD')}
            >
              Standard
            </button>
            <button 
              className={`filter-btn ${filter === 'HANDICAP' ? 'active' : ''}`}
              onClick={() => handleFilterChange('HANDICAP')}
            >
              Handicap
            </button>
            <button 
              className={`filter-btn ${filter === 'PREMIUM' ? 'active' : ''}`}
              onClick={() => handleFilterChange('PREMIUM')}
            >
              Premium
            </button>
          </div>
          
          {loadingSlots ? (
            <div className="loading">Loading parking slots...</div>
          ) : (
            <div className="slots-grid">
              {slots.length === 0 ? (
                <p>No available parking slots</p>
              ) : (
                slots.map(slot => (
                  <div 
                    key={slot.id} 
                    className={`slot ${slot.slotType.toLowerCase()} ${slot.isAvailable ? '' : 'occupied'} ${slotNumber === slot.slotNumber ? 'selected' : ''}`}
                    onClick={() => handleSlotSelect(slot)}
                  >
                    <h3>{slot.slotNumber}</h3>
                    <p>Type: {slot.slotType}</p>
                    <p>Status: {slot.isAvailable ? 'Available' : 'Occupied'}</p>
                    {slotNumber === slot.slotNumber && (
                      <div className="selected-indicator">SELECTED</div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParkVehicle;