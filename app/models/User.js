// User Data and User Account Model
// import Joi from 'joi';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import {app} from '../firebaseConfig';

// const auth = getAuth(app);

const AUTH_ERRORS = {
    "auth/email-already-in-use":"Email already exist",
    "auth/network-request-failed":"Network error, check your internet connection and try again",
    "auth/email-already-in-use":"Email already in use",
    "auth/user-not-found":"Invalid email/password",
    "auth/wrong-password":"Invalid email/password"
}

class UserAccount {
    
    // static validateAuthData(authData){
    //     const authDataSchema = Joi.object({
    //         email: Joi.string().email().required(),
    //         password: Joi.string().email().required(),
    //     });

    //     return authDataSchema.validate(authData);
    // }
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

    static async signInUser(auth, authData){
        
        const {email, password} = authData;

        // Sign in account
        let userCredential;

        try{
            userCredential = await signInWithEmailAndPassword(
                auth, 
                "me@ccodepraycode.com", "letmeinn"
            );
        }
        catch (err){
            const code = err.code;

            console.log("Error code:", code);

            throw ({
                code,
                message: AUTH_ERRORS[code] || 'Cannot sign into account, check input and try again.'
            });
        }

        // JSONLog(userCredential.user);
        // consoleuserCredential.user;

    }
}


export {
    UserAccount,
}