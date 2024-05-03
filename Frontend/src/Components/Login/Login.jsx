import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { usernameValidate } from '../../Helper/Validate';
import { Toaster } from 'react-hot-toast';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      // Validate the form
      const errors = await usernameValidate(values);

      // If there are no errors, navigate to /home
      if (Object.keys(errors).length === 0) {
        console.log(values);
        // Navigate to /home
        window.location.href = '/home';
      }
    }
  });

  return (
    <>
      <Toaster position='top-center' />
      <Navbar/>
      <div className="min-h-screen flex items-center justify-center background-image">
        <div className="bg-white shadow-md px-10 py-8 rounded-lg w-96">
          <h2 className="text-center text-3xl text-blue-900 font-bold mb-4">Welcome to LearnNleap</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 hover:shadow-md"
                placeholder="Enter your username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              {formik.errors.username && <p className="text-red-500 text-xs italic">{formik.errors.username}</p>}
            </div>
            <div className="mb-6">
            <label >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 hover:shadow-md"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
              >
                Sign In
              </button>
              <Link
                to="/recovery"
                className="inline-block font-bold text-sm text-blue-500 hover:text-blue-800 transition duration-300"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">Don't have an account? <Link to="/register" className="text-blue-500 hover:text-blue-800 transition duration-300">Sign Up</Link></p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Login;
