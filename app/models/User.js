// User Data and User Account Model
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import {app} from '../firebaseConfig';

// const auth = getAuth(app);

const AUTH_ERRORS = {
    "auth/email-already-in-use":"Email already exist",
    "auth/network-request-failed":"Network error, check your internet connection and try again",
    "auth/email-already-in-use":"Email already in use"
}

const log = (obj)=> console.log(JSON.stringify(obj, null, 4))

class UserAccount {
    
    
    static async createUser(auth, newUserData){
        // create user data from firebase
        // on Promise fulfiled, account has been created
        // on Promise rejected, account was not created with error messages
        

        // Create an account with email and password,
        // when that is successful, then bootstrap a profile with type field
        const {type, email, password, confirmPassword} = newUserData;

        // Validate email

        // Validate password
        if (!Object.is(confirmPassword, password)){
            throw ({
                message: 'Password does not match',
            }); 
        }

        // Create account
        let userCredential;

        try{
            userCredential = await createUserWithEmailAndPassword(auth, email, password);
        }
        catch (err){
            const code = err.code;
            // const message = err.message;

            console.log("Error code:", code);
            // console.log("Error message:", message);

            throw ({
                code,
                message: AUTH_ERRORS[code] || 'Cannot create account, check input and try again.'
            });
        }

        // log(userCredential.user);
        // consoleuserCredential.user;

    }
}


export {
    UserAccount,
}