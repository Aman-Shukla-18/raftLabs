import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const fetchProperties = async () => {
  const response = await api.get('/properties');
  return response.data;
};

export const fetchProperty = async (id: string) => {
  const response = await api.get(`/properties/${id}`);
  return response.data;
};

export const fetchBookings = async () => {
  const response = await api.get('/bookings');
  return response.data;
};

export const createBooking = async (booking: any) => {
  const response = await api.post('/bookings', booking);
  return response.data;
};