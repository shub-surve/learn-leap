import toast from "react-hot-toast";

export async function registerValidate(values) {
    const errors = registerVerify({}, values); // Call registerVerify instead of registerValidate
    return errors;
}

function registerVerify(errors = {}, values) {
    const specialChar = /[~!@#$%^&*()_?,.]/;

    if (!values.username) {
        errors.username = toast.error("Username Required..."); // Show error toast for missing username
    } else if (values.username.includes(" ")) {
        errors.username = toast.error('Invalid Username'); // Show error toast for invalid username
    }

    if (!values.email) {
        errors.email = toast.error("Email Required..."); // Fix the assignment for email error message
    } else if (!values.email.includes("@") || !values.email.includes(".")) {
        errors.email = toast.error("Invalid email"); // Show error toast for invalid email format
    }

    if (!values.password) {
        errors.password = toast.error("Password Required...");
    } else if (values.password.length < 6) {
        errors.password = toast.error("Password must be more than 6 characters");
    } else if (values.password.includes(" ")) {
        errors.password = toast.error("Password must not have spaces");
    } else if (!specialChar.test(values.password)) {
        errors.password = toast.error("Password should contain at least one special character");
    }

    return errors; // Return the errors
}

export default registerValidate; // Export the registerValidate function
