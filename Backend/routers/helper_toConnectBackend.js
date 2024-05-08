import axios from 'axios'

export async function authenticate(username){
    try{
    return await axios.post('/api/authenticate' , {username})
} catch (error) {
    return {error : "Username doesn't exist"}
}
}

// GET USER DETAILS

export async function getUser({username}){
    try{
        const {data} = await axios.get(`/api/user/${username}`)
    } catch(error){
        return {error : "Password doesnt match"}
    }
}

// REgister user function
export async function registerUser(credintials){
    try{
        const {data : {msg} , status} = await axios.post('/api/register' , credintials);
        let {username , email} = credintials;
         //send email
         if(status === 201){
            await axios.post('/api/register' , {username , userEmail ,text : msg })
         }
    }catch(error){
        return Promise.reject({error})
    }
}

////LOGIN FUNCTION

export async function verifyPass({username , password}){
    try{

        if(username){
            await axios.post('/api/login' , {username , password})
            return Promise.resolve({data})
        }
    } catch(error){
        return Promise.reject({error : "Password Do Not Match"})
    }
}