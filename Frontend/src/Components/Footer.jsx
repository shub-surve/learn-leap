import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineLinkedin } from "react-icons/ai";
import { Link } from 'react-router-dom';
// import { ReactComponent as Logo } from './Imgs/logo.svg';

const Footer = () => {
  return (
    <footer className="bg-white py-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="flex items-center mb-4 md:mb-0">
            <img src='./Imgs/logo.png' className="h-16 mr-2" />
            {/* <span className="text-white text-lg font-semibold">Your Logo</span> */}
          </div>

          {/* Links */}
          <nav className="mb-4 md:mb-0 md:mr-8 align-center">
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <li>
                <Link
                  to={'/'}
                  className="text-gray-500 hover:text-gray-200 transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
              <Link
                  to={'/'}
                  className="text-gray-500 hover:text-gray-200 transition duration-300"
                >
                  About
                </Link>
              </li>
              <li>
              <Link
                  to={'/'}
                  className="text-gray-500 hover:text-gray-200 transition duration-300"
                >
                  Sourses
                </Link>
              </li>
              <li>
              <Link
                  to={'/'}
                  className="text-gray-500 hover:text-gray-200 transition duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Social Icons */}
          <div className="flex space-x-4 ">
            <a
              href="#"
              className="text-black hover:text-gray-200 transition duration-300"
            >
              <FaFacebook/>
            </a>
            <a
              href="#"
              className="text-black hover:text-gray-200 transition duration-300"
            >
              <FaXTwitter/>
            </a>
            <a
              href="#"
              className="text-black hover:text-gray-200 transition duration-300"
            >
              <AiOutlineLinkedin/>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8">
          <p className="text-black">
            &copy; {new Date().getFullYear()} learnNleap.ed .All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
