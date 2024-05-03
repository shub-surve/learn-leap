import { useState } from 'react'
import './App.css'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'

// Login Imports-----
import Password from './Components/Login/Password'
import Login from './Components/Login/Login'
import PageNotFound from './Components/Login/PageNotFound'
import Register from './Components/Login/Register'
import Recovery from './Components/Login/Recovery'
import FAQPage from './Components/Navbar/FAQ'
import Profile from './Components/HomePage/Profile'






const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/recovery',
    element: <Recovery/>
  },
  // {
  //   path: '/home',
  //   element: <HomePage/>
  // },
  {
    path: '/profile',
    element: <Profile/>
  },
  {
    path: '/FAQ',
    element: <FAQPage/>
  }
])


function App() {
  

  return (
    <>
   <RouterProvider router = {router}/>
    </>
  )
}

export default App
