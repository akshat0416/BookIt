export interface Experience {
  id: number;
  title: string;
  description: string;
  image_url: string;
  base_price: number;
  duration_minutes: number;
  min_age: number;
  max_group_size: number;
  includes_gear: boolean;
}

export interface Slot {
  id: number;
  experience_id: number;
  date: string;
  start_time: string;
  end_time: string;
  max_capacity: number;
  booked_count: number;
}

export interface BookingRequest {
  experience_id: number;
  slot_id: number;
  customer_name: string;
  customer_email: string;
  quantity: number;
  promo_code?: string;
}

export interface BookingResponse {
  success: boolean;
  booking: {
    id: number;
    ref_id: string;
    customer_name: string;
    customer_email: string;
    quantity: number;
    subtotal: number;
    tax_amount: number;
    total_amount: number;
    promo_code?: string;
    discount_amount: number;
  };
}

export interface PromoValidationRequest {
  code: string;
  amount: number;
}

export interface PromoValidationResponse {
  valid: boolean;
  discount_amount: number;
  discount_type?: string;
  error?: string;
}