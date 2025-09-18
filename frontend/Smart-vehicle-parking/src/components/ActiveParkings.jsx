import React from 'react';

const ActiveParkings = ({ parkings }) => {
  return (
    <div>
      <h2>Active Parkings</h2>
      <table>
        <thead>
          <tr>
            <th>License Plate</th>
            <th>Vehicle Type</th>
            <th>Slot Number</th>
            <th>Entry Time</th>
          </tr>
        </thead>
        <tbody>
          {parkings.map(parking => (
            <tr key={parking.id}>
              <td>{parking.vehicle.licensePlate}</td>
              <td>{parking.vehicle.vehicleType}</td>
              <td>{parking.parkingSlot.slotNumber}</td>
              <td>{new Date(parking.entryTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveParkings;