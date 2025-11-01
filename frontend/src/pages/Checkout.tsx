import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Experience, Slot, BookingRequest } from '../types';
import { bookingsAPI, promoAPI } from '../services/api';

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { experience, slot, quantity = 1 } = location.state as {
    experience: Experience;
    slot: Slot;
    quantity: number;
  };

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    promo_code: ''
  });
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [promoError, setPromoError] = useState('');

  if (!experience || !slot) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-red-600">Invalid booking data</div>
      </div>
    );
  }

  const subtotal = experience.base_price * quantity;
  const tax_rate = 0.06;
  const tax_amount = (subtotal - discount) * tax_rate;
  const total_amount = subtotal - discount + tax_amount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validatePromoCode = async () => {
    if (!formData.promo_code) return;

    try {
      const result = await promoAPI.validate({
        code: formData.promo_code,
        amount: subtotal
      });

      if (result.valid) {
        setDiscount(result.discount_amount);
        setPromoError('');
      } else {
        setDiscount(0);
        setPromoError(result.error || 'Invalid promo code');
      }
    } catch (error) {
      setPromoError('Failed to validate promo code');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookingData: BookingRequest = {
        experience_id: experience.id,
        slot_id: slot.id,
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        quantity,
        promo_code: formData.promo_code || undefined
      };

      const result = await bookingsAPI.create(bookingData);
      
      navigate('/booking-result', { 
        state: { 
          success: true, 
          booking: result.booking 
        } 
      });
    } catch (error: any) {
      navigate('/booking-result', { 
        state: { 
          success: false, 
          error: error.response?.data?.error || 'Booking failed' 
        } 
      });
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.customer_name && formData.customer_email;

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">BookIt</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  name="customer_name"
                  required
                  value={formData.customer_name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="customer_email"
                  required
                  value={formData.customer_email}
                  onChange={handleInputChange}
                  placeholder="Your email"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Promo Code */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Promo Code</h2>
            <div className="flex gap-3">
              <input
                type="text"
                name="promo_code"
                value={formData.promo_code}
                onChange={handleInputChange}
                placeholder="Enter promo code"
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={validatePromoCode}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Apply
              </button>
            </div>
            {promoError && (
              <p className="text-red-600 text-sm mt-2">{promoError}</p>
            )}
            {discount > 0 && (
              <p className="text-green-600 text-sm mt-2">
                Promo applied! Discount: ₹{discount}
              </p>
            )}
          </div>

          {/* Booking Summary */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
            <div className="border-2 border-gray-300 rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b">
                <div>
                  <h3 className="font-semibold text-lg">{experience.title}</h3>
                  <p className="text-gray-600">
                    {new Date(slot.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })} • {new Date(`2000-01-01T${slot.start_time}`).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{quantity} person</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>₹{tax_amount.toFixed(0)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>₹{total_amount.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="text-sm text-gray-600">
            <p>By completing this booking, you agree to our terms and conditions and safety policy.</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-lg ${
              isFormValid && !loading
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? 'Processing...' : `Pay ₹${total_amount.toFixed(0)}`}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Checkout;