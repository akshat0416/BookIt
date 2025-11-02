import axios from 'axios';
import {
  Experience,
  Slot,
  BookingRequest,
  BookingResponse,
  PromoValidationRequest,
  PromoValidationResponse
} from '../types';

// 👇 Use your live Render backend URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://bookit-mez6.onrender.com/api'; // ✅ Updated

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const experiencesAPI = {
  getAll: (): Promise<Experience[]> =>
    api.get('/experiences').then(response => response.data),

  getById: (id: number): Promise<Experience> =>
    api.get(`/experiences/${id}`).then(response => response.data),

  getSlots: (id: number, date?: string): Promise<Slot[]> =>
    api.get(`/experiences/${id}/slots`, { params: { date } }).then(response => response.data),
};

export const bookingsAPI = {
  create: (bookingData: BookingRequest): Promise<BookingResponse> =>
    api.post('/bookings', bookingData).then(response => response.data),
};

export const promoAPI = {
  validate: (promoData: PromoValidationRequest): Promise<PromoValidationResponse> =>
    api.post('/promo/validate', promoData).then(response => response.data),
};
