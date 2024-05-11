import React from 'react';
import mentors from './mentors.json'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer';



const MentorCard = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className="flex flex-wrap justify-center">
      {mentors.map((mentor, index) => (
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
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded">
              View Profile
            </button>
          </div>
        </div>
    
      ))}
    </div>
    <Footer/>
    </>
  );
};

export default MentorCard;