import React from 'react';
import { Link } from 'react-router-dom';

const BookingResult: React.FC = () => {
  // For demo purposes, using a mock booking reference
  const bookingRef = `HUF${Math.random().toString(36).substr(2, 3).toUpperCase()}${Math.floor(Math.random() * 1000)}.SO`;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Booking Confirmed</h1>
        
        <div className="bg-white border-2 border-gray-300 rounded-lg p-8 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">Ref ID: {bookingRef}</div>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700"
          >
            Back to Home
          </Link>
          
          <div className="text-sm text-gray-600">
            Thank you for your booking!
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingResult;