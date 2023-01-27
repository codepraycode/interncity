// User Data and User Account Model

import { HandlerJoiError, JSONLog } from "../utils";
import { authDataSchema, createAccountDataSchema } from "./base";
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
    
    static async validateAuthData(authData){
        
        const {error, value} = authDataSchema.validate(authData);

        if (error){
            HandlerJoiError(error, "Invalid Login credentials");
        }
        return value;
    }
    static async validateCreateAccountData(userData){
        
        const {error, value} = createAccountDataSchema.validate(userData);

        if (error){
            HandlerJoiError(error, "Invalid user credentials");
        }
        return value;
    }

}


export {
    UserAccount,
}