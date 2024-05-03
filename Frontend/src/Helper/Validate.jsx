import toast from 'react-hot-toast';

export async function usernameValidate(values) {
    const errors = {}; // Initialize errors object
    usernameVerify(errors, values); // Call usernameVerify with errors object and values
    return errors; // Return the errors
}

function usernameVerify(errors, values) {
    if (!values.username) {
        errors.username = toast.error("Username Required..."); // Show error toast for missing username
    } else if (values.username.includes(" ")) {
        errors.username = toast.error('Invalid Username'); // Show error toast for invalid username
    }

    if (!values.password) {
        errors.password = toast.error("Password Required..."); // Show error toast for missing password
    } else if (values.password.length < 6) {
        errors.password = toast.error("Password must be more than 6 characters"); // Show error toast for short password
    } else if (values.password.includes(" ")) {
        errors.password = toast.error("Password must not have spaces"); // Show error toast for password with spaces
    } else if (!/[~!@#$%^&*()_?,.]/.test(values.password)) {
        errors.password = toast.error("Password should contain at least one special character"); // Show error toast for password without special characters
    }
}
