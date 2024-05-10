import axios from 'axios';

export async function authenticate(username) {
    try {
        return await axios.post('/api/authenticate', { username });
    } catch (error) {
        return { error: "Username doesn't exist" };
    }
}

// GET USER DETAILS

export async function getUser(username) {
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return data;
    } catch (error) {
        return { error: "Password doesn't match" };
    }
}

// Register user function
export async function registerUser(credentials) {
    try {
        const { data: { msg }, status } = await axios.post('/api/register', credentials);
        const { username, email } = credentials;
        
        // Send email
        if (status === 201) {
            await axios.post('/api/register', { username, email, text: msg });
        }
    } catch (error) {
        return Promise.reject({ error });
    }
}

// LOGIN FUNCTION

export async function verifyPass({ username, password }) {
    try {
        if (username) {
            await axios.post('/api/login', { username, password });
            return Promise.resolve();
        }
    } catch (error) {
        return Promise.reject({ error: "Password does not match" });
    }
}

//TO UPDATE PROFILE
export async function updateUser(response){
    try{

        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/Profile-update' , response , token);


    }catch(err){
        return Promise.reject({err :"Couldn't Update User Profile"})
    }
}