import React from 'react';
import { Experience } from '../types';
import { Link } from 'react-router-dom';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  // Map experience IDs to Indian locations
  const getLocation = (id: number) => {
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
    return locations[id] || 'India';
  };

  return (
    <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden hover:border-blue-500 transition-colors">
      <img 
        src={experience.image_url} 
        alt={experience.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {experience.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          {getLocation(experience.id)}
        </p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {experience.description}
        </p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ₹{experience.base_price}
        </span>
        </div>
        <Link
          to={`/experience/${experience.id}`}
          className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ExperienceCard;