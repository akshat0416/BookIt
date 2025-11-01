import React, { useState, useEffect } from 'react';
import { Experience } from '../types';
import { experiencesAPI } from '../services/api';
import ExperienceCard from '../components/ExperienceCard';

const Home: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const data = await experiencesAPI.getAll();
        setExperiences(data);
      } catch (err) {
        setError('Failed to load experiences');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl">Loading experiences...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">BookIt</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map(experience => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;