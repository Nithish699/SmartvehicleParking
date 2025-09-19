import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Get available parking slots
export const getAvailableSlots = () => api.get('/parking/slots/available');

// Get available slots by type (optional)
export const getAvailableSlotsByType = (slotType) => 
  api.get(`/parking/slots/available/${slotType}`);

// Park a vehicle
export const parkVehicle = (licensePlate, vehicleType, slotNumber) => 
  api.post('/parking/park', null, { 
    params: { licensePlate, vehicleType, slotNumber } 
  });

// Exit a vehicle
export const exitVehicle = (licensePlate) => 
  api.post('/parking/exit', null, { params: { licensePlate } });

// Make payment
export const makePayment = (recordId, paymentMethod) => 
  api.post('/parking/payment', null, { 
    params: { 
      recordId: recordId.toString(), 
      paymentMethod: paymentMethod 
    } 
  });

// Get active parkings
export const getActiveParkings = () => api.get('/parking/active');

// If you need to get ALL slots (including occupied), you would need to add:
// export const getAllSlots = () => api.get('/parking/slots');