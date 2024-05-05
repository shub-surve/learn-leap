import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Toaster } from 'react-hot-toast';

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const defaultPic = '/default_pp.png';

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      mobileNumber: '',
      location: '',
      collegeName: '',
      courseName: ''
    },
    onSubmit: values => {
      console.log(values);
      // Add your form submission logic here
    }
  });

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster position="top-center" />
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="flex justify-center mb-6">
            <label
              htmlFor="profilePicture"
              className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg transition duration-300"
            >
              {profilePicture ? (
                <img
                  src={URL.createObjectURL(profilePicture)}
                  alt="Profile Picture"
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <img
                  src={defaultPic}
                  alt="Default Profile Picture"
                  className="w-32 h-32 rounded-full object-cover"
                />
              )}
            </label>
            <input
              id="profilePicture"
              name="profilePicture"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePictureChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 placeholder-gray-500 placeholder-opacity-75"
                  placeholder="First Name"
                  {...formik.getFieldProps('firstName')}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.firstName}</div>
                ) : null}
              </div>
              <div className="w-1/2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 placeholder-gray-500 placeholder-opacity-75"
                  placeholder="Last Name"
                  {...formik.getFieldProps('lastName')}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.lastName}</div>
                ) : null}
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 placeholder-gray-500 placeholder-opacity-75"
                  placeholder="Date of Birth"
                  {...formik.getFieldProps('dateOfBirth')}
                />
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.dateOfBirth}</div>
                ) : null}
              </div>
              <div className="w-1/2">
                <input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="tel"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 placeholder-gray-500 placeholder-opacity-75"
                  placeholder="Mobile Number"
                  {...formik.getFieldProps('mobileNumber')}
                />
                {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.mobileNumber}</div>
                ) : null}
              </div>
            </div>
          </div>
          <div>
            <input
              id="location"
              name="location"
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 placeholder-gray-500 placeholder-opacity-75"
              placeholder="Location"
              {...formik.getFieldProps('location')}
            />
            {formik.touched.location && formik.errors.location ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.location}</div>
            ) : null}
          </div>
          <div>
            <input
              id="collegeName"
              name="collegeName"
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 placeholder-gray-500 placeholder-opacity-75"
              placeholder="College Name"
              {...formik.getFieldProps('collegeName')}
            />
            {formik.touched.collegeName && formik.errors.collegeName ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.collegeName}</div>
            ) : null}
          </div>
          <div>
            <input
              id="courseName"
              name="courseName"
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 placeholder-gray-500 placeholder-opacity-75"
              placeholder="Course Name"
              {...formik.getFieldProps('courseName')}
            />
            {formik.touched.courseName && formik.errors.courseName ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.courseName}</div>
            ) : null}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Next
            </button>
            <div className="text-center mt-4">
              <p className="text-gray-600 text-sm">
                Go back to <Link to="/" className="text-blue-500 hover:text-blue-600 transition duration-300 hover:underline">Home</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
