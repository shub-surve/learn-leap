import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { registerValidate } from '../../Helper/RegisterValidate';
import { Toaster } from 'react-hot-toast';
import Navbar from '../Navbar/Navbar';
const Register = () => {  

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '' 
    },
    validate: registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      const errors = await registerValidate(values);
      if (Object.keys(errors).length === 0) {
        console.log(values);
        window.location.href = '/login'
      }
    }
  });

  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen flex items-center justify-center background-image">
      <Toaster position='top-center' />
      <div className="bg-white shadow-md px-10 py-10 pt-3 rounded-lg w-96">
        <div className="mb-6">
          <h2 className="text-center text-3xl text-blue-900 font-bold mb-4">Register for learnNleap</h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-500 text-xs italic">{formik.errors.username}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-xs italic">{formik.errors.email}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-xs italic">{formik.errors.password}</div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              Register
            </button>
            <div className='text-center mt-4'>
              <p className="text-gray-600 text-sm">Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-800 transition duration-300">Sign in</Link></p>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Register;
