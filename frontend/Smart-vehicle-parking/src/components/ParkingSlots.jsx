import React from 'react';

const ParkingSlots = ({ slots }) => {
  return (
    <div>
      <h2>Available Parking Slots</h2>
      <div className="slots-grid">
        {slots.map(slot => (
          <div key={slot.id} className={`slot ${slot.slotType.toLowerCase()}`}>
            <h3>{slot.slotNumber}</h3>
            <p>Type: {slot.slotType}</p>
            <p>Status: Available</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingSlots;