import React from 'react';
import { Link } from 'react-router-dom';
import mentorsData from './mentors.json';

const MentorsCards = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {mentorsData.map((mentor, index) => (
        <div key={index} className="max-w-xs rounded overflow-hidden shadow-lg bg-white m-2 hover:shadow-xl transition duration-300">
          <img className="w-full h-32 object-cover" src={mentor.image} alt="Mentor" />
          <div className="px-4 py-2">
            <div className="font-bold text-lg mb-1">{mentor.name}</div>
            <p className="text-gray-700 text-sm">{mentor.title}</p>
          </div>
          <div className="px-4 pb-2 flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-1">
              Book Now
            </button>
            <Link to={`/mentors/${mentor.id}`} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded">
              View Profile
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MentorsCards;
