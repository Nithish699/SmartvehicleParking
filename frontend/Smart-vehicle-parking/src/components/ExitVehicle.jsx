import React, { useState } from 'react';
import { exitVehicle, makePayment } from '../services/api';

const ExitVehicle = ({ onExit }) => {
  const [licensePlate, setLicensePlate] = useState('');
  const [parkingRecord, setParkingRecord] = useState(null);
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFindVehicle = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setMessage('');
    
    try {
      const response = await exitVehicle(licensePlate);
      setParkingRecord(response.data);
      setMessage({ type: 'info', text: `Amount due: $${response.data.amountDue.toFixed(2)}` });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Error finding vehicle: ' + (error.response?.data?.message || error.message) 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayment = async (paymentMethod) => {
    setIsProcessing(true);
    setMessage({ type: 'info', text: 'Processing payment...' });
    
    try {
      await makePayment(parkingRecord.id, paymentMethod);
      setMessage({ type: 'success', text: 'Payment successful! Vehicle exited.' });
      setTimeout(() => {
        setLicensePlate('');
        setParkingRecord(null);
        onExit();
        setIsProcessing(false);
      }, 2000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Error processing payment: ' + (error.response?.data?.message || error.message) 
      });
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <h2>Exit Vehicle</h2>
      <form onSubmit={handleFindVehicle}>
        <div className="form-group">
          <label>License Plate:</label>
          <input
            type="text"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
            required
            disabled={isProcessing || parkingRecord}
          />
        </div>
        <button 
          type="submit" 
          disabled={isProcessing || parkingRecord}
        >
          {isProcessing ? 'Processing...' : 'Find Vehicle'}
        </button>
      </form>
      
      {parkingRecord && (
        <div>
          <h3>Parking Details</h3>
          <p><strong>Vehicle:</strong> {parkingRecord.vehicle.licensePlate}</p>
          <p><strong>Slot:</strong> {parkingRecord.parkingSlot.slotNumber}</p>
          <p><strong>Entry Time:</strong> {new Date(parkingRecord.entryTime).toLocaleString()}</p>
          <p><strong>Exit Time:</strong> {new Date(parkingRecord.exitTime).toLocaleString()}</p>
          <p><strong>Amount Due:</strong> ${parkingRecord.amountDue.toFixed(2)}</p>
          
          <h4>Select Payment Method:</h4>
          <div className="payment-buttons">
            <button 
              className="payment-btn cash"
              onClick={() => handlePayment('CASH')}
              disabled={isProcessing}
            >
              Cash
            </button>
            <button 
              className="payment-btn card"
              onClick={() => handlePayment('CARD')}
              disabled={isProcessing}
            >
              Card
            </button>
            <button 
              className="payment-btn digital"
              onClick={() => handlePayment('DIGITAL_WALLET')}
              disabled={isProcessing}
            >
              Digital Wallet
            </button>
          </div>
        </div>
      )}
      
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default ExitVehicle;