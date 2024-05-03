import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Toaster } from 'react-hot-toast';
import { passwordRecoveryValidate } from '../../Helper/passwordRecoveryValidate';

const PasswordRecovery = () => {

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: passwordRecoveryValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            const errors = await passwordRecoveryValidate(values);
            if (Object.keys(errors).length === 0) { // Check if there are no errors
                console.log(values);
                // Navigate to desired page upon successful form submission
                history.push("/password-reset");
            }
        }
    });

    return (
        <div className="min-h-screen flex items-center justify-center background-image">
            <div className="bg-white shadow-md px-8 py-6 pt-4 rounded-lg w-96">
                <Toaster position='top-center'></Toaster>
                <div className="mb-6">
                    <h2 className="text-center text-2xl text-blue-900 font-bold mb-2">Password Recovery for</h2>
                    <h1 className='text-center text-2xl' style={{
                        background: 'linear-gradient(135deg, #5EFCE8 0%, #736EFE 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: '2rem',
                    }}>
                        learnNleap
                    </h1>
                    <p className="text-gray-600 text-sm text-center">Enter your email to recover your password</p>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-xs italic">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                            type="submit" // Change button type to submit
                        >
                            Recover Password
                        </button>
                        <div className='text-center mt-4'>
                            <Link
                                to="/login"
                                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 transition duration-300"
                            >
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PasswordRecovery;
