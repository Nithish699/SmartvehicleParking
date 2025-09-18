import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getAvailableSlots = () => api.get('/parking/slots/available');
export const parkVehicle = (licensePlate, vehicleType, slotNumber) => 
  api.post('/parking/park', null, { 
    params: { licensePlate, vehicleType, slotNumber } 
  });
export const exitVehicle = (licensePlate) => 
  api.post('/parking/exit', null, { params: { licensePlate } });
export const makePayment = (recordId, paymentMethod) => 
  api.post('/parking/payment', null, { 
    params: { 
      recordId: recordId.toString(), 
      paymentMethod: paymentMethod 
    } 
  });
export const getActiveParkings = () => api.get('/parking/active');
