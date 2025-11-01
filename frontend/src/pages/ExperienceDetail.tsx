import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Experience, Slot } from '../types';
import { experiencesAPI } from '../services/api';

const ExperienceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Map experience IDs to Indian locations
  const getLocation = (expId: number) => {
    const locations: { [key: number]: string } = {
      1: 'Udupi, Karnataka',
      2: 'Bangalore',
      3: 'Bangalore',
      4: 'Coorg',
      5: 'Coorg',
      6: 'Sunderhan',
      7: 'Sunderhan',
      8: 'Manali',
      9: 'Manali'
    };
    return locations[expId] || 'India';
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const [expData, slotsData] = await Promise.all([
          experiencesAPI.getById(Number(id)),
          experiencesAPI.getSlots(Number(id))
        ]);
        
        setExperience(expData);
        setSlots(slotsData);
        
        if (slotsData.length > 0 && !selectedDate) {
          setSelectedDate(slotsData[0].date);
        }
      } catch (err) {
        setError('Failed to load experience details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, selectedDate]);

  const availableDates = [...new Set(slots.map(slot => slot.date))].sort();
  const availableSlots = slots.filter(slot => slot.date === selectedDate);

  const handleBookNow = () => {
    if (selectedSlot) {
      navigate('/checkout', { 
        state: { 
          experience, 
          slot: selectedSlot,
          quantity: 1 
        } 
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl">Loading experience details...</div>
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-red-600">{error || 'Experience not found'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">BookIt</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Experience Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{experience.title}</h1>
          <p className="text-gray-600 mb-2">{getLocation(experience.id)}</p>
          <p className="text-gray-600 mb-6">
            {experience.description}
          </p>
        </div>

        {/* Date Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Choose date</h2>
          <div className="flex gap-3 overflow-x-auto pb-4">
            {availableDates.map(date => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-6 py-3 rounded-lg border-2 flex-shrink-0 ${
                  selectedDate === date
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {new Date(date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slot Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Choose time</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {availableSlots.map(slot => (
              <button
                key={slot.id}
                onClick={() => setSelectedSlot(slot)}
                className={`p-4 rounded-lg border-2 text-center ${
                  selectedSlot?.id === slot.id
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                } ${
                  (slot.max_capacity - slot.booked_count) <= 0
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
                disabled={(slot.max_capacity - slot.booked_count) <= 0}
              >
                <div className="font-medium text-lg">
                  {new Date(`2000-01-01T${slot.start_time}`).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </div>
              </button>
            ))}
          </div>
          <div className="mt-3 text-sm text-gray-500">
            All times are in IST (GMT +5:30)
          </div>
        </div>

        {/* About Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">About</h2>
          <p className="text-gray-600">
            Scenic routes, trained guides, and safety briefing. Minimum age {experience.min_age}.
          </p>
        </div>

        {/* Book Button */}
        <button
          onClick={handleBookNow}
          disabled={!selectedSlot}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg ${
            selectedSlot
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {selectedSlot ? 'Book Now' : 'Select a Time Slot'}
        </button>
      </main>
    </div>
  );
};

export default ExperienceDetail;