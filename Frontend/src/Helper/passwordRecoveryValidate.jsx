import toast from "react-hot-toast";

export async function passwordRecoveryValidate(values) {
    const errors = {}; // Initialize errors object

    // Email validation
    if (!values.email) {
        errors.email = toast.error("Email is required"); // Show error toast for missing email
    } else if (!isValidEmail(values.email)) {
        errors.email = toast.error("Invalid email format"); // Show error toast for invalid email format
    }

    return errors; // Return the errors
}

// Function to validate email format
function isValidEmail(email) {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
