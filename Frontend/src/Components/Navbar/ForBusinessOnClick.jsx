import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BusinessModal = ({ onClose }) => (
  <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
    <div className="bg-white rounded-lg p-6" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div className="flex justify-between mb-4">
        <div>
          <img src="/employer-icon.png" alt="For Employers" />
          <span>For Employers</span>
        </div>
        <div>
          <img src="/college-icon.png" alt="For Colleges" />
          <span>For Colleges</span>
        </div>
      </div>
      <div>
        <h3 id="modalTitle" className="text-lg font-semibold mb-2">Our stories</h3>
        <ul>
          <li>
            <span className="mr-2">
              <img src="/clientele-icon.png" alt="Clientele" />
            </span>
            Clientele
          </li>
          {/* Other list items */}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Be a part of us</h3>
        <ul>
          <li>
            <span className="mr-2">
              <img src="/contact-icon.png" alt="Contact Us" />
            </span>
            Contact Us
          </li>
          {/* Other list items */}
        </ul>
      </div>
      <button
        onClick={onClose}
        className="mt-4 bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded hover:bg-gray-400 transition duration-300"
        aria-label="Close modal"
      >
        Close
      </button>
    </div>
  </div>
);

const ForBusiness = () => {
  const [showForBusinessModal, setShowForBusinessModal] = useState(false);

  const toggleForBusinessModal = () => {
    setShowForBusinessModal(!showForBusinessModal);
  };

 
};

export default ForBusiness;
