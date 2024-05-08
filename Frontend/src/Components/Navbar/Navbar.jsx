import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import Searchbar from './Searchbar';
import { IoIosBusiness } from "react-icons/io";
import ForBusiness from './ForBusinessOnClick'; // Ensure this is the default export if it's a component

const Navbar = () => {
  const [showForBusiness, setShowForBusiness] = useState(false);

  const navItems = [
    { to: '/learn', text: 'Learn' },
    { to: '/practice', text: 'Practice' },
    { to: '/mentorship', text: 'Mentorship' },
    { to: '/compete', text: 'Compete' },
    { to: '/jobs', text: 'Jobs' },
  ];

  const toggleForBusinessModal = () => {
    setShowForBusiness(!showForBusiness);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-2 md:px-1">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img className="h-12 mr-4" src="./Imgs/logo.png" alt="Logo" />
            <span className="text-gray-700 font-semibold text-lg">learnNleap</span>
          </div>
          <Searchbar />
          {/* Navigation Links */}
          <ul className="hidden md:flex items-center space-x-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.to}
                  className="text-gray-700 font-medium hover:text-blue-500 transition duration-300 px-3 py-2 rounded-md"
                >
                  {item.text}
                </Link>
              </li>
            ))}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="text-gray-700 font-medium hover:text-blue-500 transition duration-300 px-3 py-2 rounded-md">
                Login
              </Link>
              <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                Join us
              </button>
              <button
                className="bg-yellow-600 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-700 transition duration-300 flex items-center"
                onClick={toggleForBusinessModal}
              >
                <IoIosBusiness className='mr-2'/>
                For Business
              </button>
            </div>
          </ul>
          {/* Mobile Dropdown Menu */}
          <div className="md:hidden">
            <Dropdown items={navItems} />
          </div>
        </div>
      </div>
      {showForBusiness && <ForBusiness />}
    </nav>
  );
};

export default Navbar;
