import React, { useState } from 'react';
import { parkVehicle } from '../services/api';

const ParkVehicle = ({ onPark }) => {
  const [licensePlate, setLicensePlate] = useState('');
  const [vehicleType, setVehicleType] = useState('CAR');
  const [slotNumber, setSlotNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await parkVehicle(licensePlate, vehicleType, slotNumber);
      setMessage('Vehicle parked successfully!');
      setLicensePlate('');
      setSlotNumber('');
      onPark();
    } catch (error) {
      setMessage('Error parking vehicle: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h2>Park Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>License Plate:</label>
          <input
            type="text"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Vehicle Type:</label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="CAR">Car</option>
            <option value="MOTORCYCLE">Motorcycle</option>
            <option value="TRUCK">Truck</option>
          </select>
        </div>
        <div>
          <label>Slot Number:</label>
          <input
            type="text"
            value={slotNumber}
            onChange={(e) => setSlotNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Park Vehicle</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ParkVehicle;