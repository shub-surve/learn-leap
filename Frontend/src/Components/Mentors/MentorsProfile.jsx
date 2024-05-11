import React from 'react';
import { useParams } from 'react-router-dom';
import mentorsData from './mentors.json';

const MentorProfile = () => {
  const { id } = useParams();

  // Convert id to integer for comparison
  const mentor = mentorsData.find(mentor => mentor.id === parseInt(id));

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-semibold mb-4">Mentor Profile</h2>
      {mentor ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">{mentor.name}</h3>
          <p className="text-lg text-gray-700 mb-2">{mentor.title}</p>
          <p className="text-gray-600">{mentor.description}</p>
        </div>
      ) : (
        <p className="text-red-500">Mentor not found</p>
      )}
    </div>
  );
};

export default MentorProfile;
