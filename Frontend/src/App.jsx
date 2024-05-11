import React from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Register from './Components/Login/Register';
import Recovery from './Components/Login/Recovery';
import FAQPage from './Components/Navbar/FAQ';
import Profile from './Components/HomePage/Profile';
import MentorsCards from './Components/Mentors/MentorsCards';
import MentorProfile from './Components/Mentors/MentorsProfile';
import mentorsData from './Components/Mentors/mentors.json';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/recovery',
    element: <Recovery />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/FAQ',
    element: <FAQPage />,
  },
  {
    path: '/mentors',
    element: <MentorsCards />,
  },
  {
    path: '/mentors/:id',
    element: <MentorProfile mentorsData={mentorsData} />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;