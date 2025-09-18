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
      setMessage(`Amount due: $${response.data.amountDue.toFixed(2)}`);
    } catch (error) {
      setMessage('Error finding vehicle: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayment = async (paymentMethod) => {
    setIsProcessing(true);
    setMessage('Processing payment...');
    
    try {
      await makePayment(parkingRecord.id, paymentMethod);
      setMessage('Payment successful! Vehicle exited.');
      setTimeout(() => {
        setLicensePlate('');
        setParkingRecord(null);
        onExit();
        setIsProcessing(false);
      }, 2000);
    } catch (error) {
      setMessage('Error processing payment: ' + (error.response?.data?.message || error.message));
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Exit Vehicle</h2>
      <form onSubmit={handleFindVehicle} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            License Plate:
          </label>
          <input
            type="text"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
            required
            style={{ 
              width: '100%', 
              padding: '8px', 
              border: '1px solid #ccc', 
              borderRadius: '4px' 
            }}
            disabled={isProcessing}
          />
        </div>
        <button 
          type="submit" 
          disabled={isProcessing}
          style={{
            padding: '10px 15px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isProcessing ? 'not-allowed' : 'pointer'
          }}
        >
          {isProcessing ? 'Processing...' : 'Find Vehicle'}
        </button>
      </form>
      
      {parkingRecord && (
        <div style={{ 
          border: '1px solid #ddd', 
          padding: '15px', 
          borderRadius: '4px', 
          marginBottom: '20px' 
        }}>
          <h3>Parking Details</h3>
          <p><strong>Vehicle:</strong> {parkingRecord.vehicle.licensePlate}</p>
          <p><strong>Slot:</strong> {parkingRecord.parkingSlot.slotNumber}</p>
          <p><strong>Entry Time:</strong> {new Date(parkingRecord.entryTime).toLocaleString()}</p>
          <p><strong>Exit Time:</strong> {new Date(parkingRecord.exitTime).toLocaleString()}</p>
          <p><strong>Amount Due:</strong> ${parkingRecord.amountDue.toFixed(2)}</p>
          
          <h4>Select Payment Method:</h4>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <button 
              onClick={() => handlePayment('CASH')}
              disabled={isProcessing}
              style={{
                padding: '10px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isProcessing ? 'not-allowed' : 'pointer'
              }}
            >
              Cash
            </button>
            <button 
              onClick={() => handlePayment('CARD')}
              disabled={isProcessing}
              style={{
                padding: '10px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isProcessing ? 'not-allowed' : 'pointer'
              }}
            >
              Card
            </button>
            <button 
              onClick={() => handlePayment('DIGITAL_WALLET')}
              disabled={isProcessing}
              style={{
                padding: '10px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isProcessing ? 'not-allowed' : 'pointer'
              }}
            >
              Digital Wallet
            </button>
          </div>
        </div>
      )}
      
      {message && (
        <div style={{
          padding: '10px',
          backgroundColor: message.includes('Error') ? '#ffebee' : '#e8f5e8',
          border: `1px solid ${message.includes('Error') ? '#f44336' : '#4CAF50'}`,
          borderRadius: '4px',
          color: message.includes('Error') ? '#c62828' : '#2e7d32'
        }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default ExitVehicle;