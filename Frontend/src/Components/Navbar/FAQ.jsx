import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from '../Footer';

const FAQPage = () => {
  const faqs = [
    {
      question: "What is learnNleap?",
      answer: "learnNleap is an online learning platform that offers a wide range of courses on various topics.",
      image: "/faq-image-1.jpg"
    },
    {
      question: "How can I register?",
      answer: "To register, click on the 'Register' button on the homepage and follow the instructions.",
      image: "/faq-image-2.jpg"
    },
    {
      question: "Is there a fee for using learnNleap?",
      answer: "Registration on learnNleap is free. However, some courses may require payment.",
      image: "/faq-image-3.jpg"
    },
    {
      question: "How can I contact support?",
      answer: "You can contact our support team by emailing support@learnNleap.com or calling +1 (123) 456-7890.",
      image: "/faq-image-4.jpg"
    },
    {
      question: "How can I contact support?",
      answer: "You can contact our support team by emailing support@learnNleap.com or calling +1 (123) 456-7890.",
      image: "/faq-image-5.jpg"
    }
  ];

  return (
    <div className="background-image min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-500">Frequently Asked Questions</h1>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQCard key={index} question={faq.question} answer={faq.answer} image={faq.image} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const FAQCard = ({ question, answer, image }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`rounded-lg mb-8 overflow-hidden border-2 border-blue-500 transition duration-300 transform hover:-translate-y-1 ${
        isOpen ? 'shadow-lg' : ''
      }`}
    >
      <div className="bg-blue-500 text-white p-4 cursor-pointer flex justify-between items-center transition duration-300 hover:bg-blue-600" onClick={toggleDropdown}>
        <h2 className="text-xl font-semibold">{question}</h2>
        <svg
          className={`w-6 h-6 transition-transform transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
      <div
        className={`transition-all duration-300 ${
          isOpen ? 'max-h-full opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden py-0'
        }`}
      >
        <div className="p-4 bg-white flex items-center">
          <img src={image} alt="FAQ" className="w-32 h-32 object-cover rounded-md mr-4" />
          <p className="text-gray-700">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;