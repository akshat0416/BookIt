import React, { useEffect, useState } from "react";

interface Experience {
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

const Experiences: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://bookit-mez6.onrender.com/api/experiences")
      .then((response) => response.json())
      .then((data) => {
        setExperiences(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching experiences:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading experiences...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Explore Experiences
      </h1>

      {experiences.length === 0 ? (
        <p className="text-center text-gray-600">No experiences available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={exp.image_url}
                alt={exp.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800">
                  {exp.title}
                </h2>
                <p className="text-gray-600 text-sm mt-2">{exp.description}</p>

                <div className="mt-4 text-gray-700 text-sm">
                  <p>
                    ⏱ Duration:{" "}
                    <span className="font-medium">
                      {exp.duration_minutes} minutes
                    </span>
                  </p>
                  <p>
                    👥 Max Group Size:{" "}
                    <span className="font-medium">{exp.max_group_size}</span>
                  </p>
                  <p>
                    💰 Price:{" "}
                    <span className="font-semibold text-blue-600">
                      ₹{exp.base_price}
                    </span>
                  </p>
                  <p>
                    🧒 Min Age:{" "}
                    <span className="font-medium">{exp.min_age}</span>
                  </p>
                  <p>
                    ⚙️ Includes Gear:{" "}
                    <span className="font-medium">
                      {exp.includes_gear ? "Yes" : "No"}
                    </span>
                  </p>
                </div>

                <button className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Experiences;
