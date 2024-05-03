import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCategories, setShowCategories] = useState(false);

  const categories = [
    { name: 'Course', link: '/course' },
    { name: 'Projects', link: '/projects' },
    { name: 'Company preparation', link: '/company-preparation' },
    { name: 'Skill Assessments', link: '/skill-assessments' },
    { name: 'Mentors', link: '/mentors' },
    { name: 'Opportunities', link: '/opportunities' },
    { name: 'Jobs & Internships', link: '/jobs-internships' },
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <nav className="py-4">
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center">
          <CiSearch className="h-6 w-6 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search Opportunities"
            value={searchTerm}
            onChange={handleSearch}
            onClick={toggleCategories} // Click event to toggle categories
            className="w-full rounded-full px-4 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {showCategories && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden absolute left-0 right-0 top-full z-10">
            <div className="p-2">
              {categories.map((category, index) => (
                <a
                  key={index}
                  href={category.link}
                  className="block rounded-full px-3 py-1 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-300 transition duration-300 mb-2"
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Searchbar;
