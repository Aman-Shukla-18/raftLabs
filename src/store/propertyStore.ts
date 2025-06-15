import { create } from 'zustand';

interface Property {
  id: string;
  title: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  features: string[];
  images: string[];
}

interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  status: string;
}

interface PropertyStore {
  properties: Property[];
  bookings: Booking[];
  setProperties: (properties: Property[]) => void;
  setBookings: (bookings: Booking[]) => void;
  addBooking: (booking: Booking) => void;
}

export const usePropertyStore = create<PropertyStore>((set) => ({
  properties: [],
  bookings: [],
  setProperties: (properties) => set({ properties }),
  setBookings: (bookings) => set({ bookings }),
  addBooking: (booking) =>
    set((state) => ({ bookings: [...state.bookings, booking] })),
}));