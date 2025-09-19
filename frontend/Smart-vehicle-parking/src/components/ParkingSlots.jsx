import React, { useState, useEffect } from 'react';
import { getAvailableSlots, getAvailableSlotsByType } from '../services/api';

const ParkingSlots = () => {
  const [slots, setSlots] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  const fetchSlots = async (type = 'ALL') => {
    try {
      setLoading(true);
      let response;
      if (type === 'ALL') {
        response = await getAvailableSlots();
      } else {
        response = await getAvailableSlotsByType(type);
      }
      setSlots(response.data);
    } catch (error) {
      console.error('Error fetching slots:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots(filter);
  }, [filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  if (loading) {
    return <div>Loading parking slots...</div>;
  }

  return (
    <div>
      <h2>Available Parking Slots</h2>
      
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
      
      <div className="slots-grid">
        {slots.length === 0 ? (
          <p>No available parking slots</p>
        ) : (
          slots.map(slot => (
            <div key={slot.id} className={`slot ${slot.slotType.toLowerCase()} ${slot.isAvailable ? '' : 'occupied'}`}>
              <h3>{slot.slotNumber}</h3>
              <p>Type: {slot.slotType}</p>
              <p>Status: {slot.isAvailable ? 'Available' : 'Occupied'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ParkingSlots;