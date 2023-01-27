// User Data and User Account Model

import { HandlerJoiError, JSONLog, userTypes} from "../utils";
import { authDataSchema, createAccountDataSchema } from "./base";

// const auth = getAuth(app);

const AUTH_ERRORS = {
    "auth/email-already-in-use":"Email already exist",
    "auth/network-request-failed":"Network error, check your internet connection and try again",
    "auth/email-already-in-use":"Email already in use",
    "auth/user-not-found":"Invalid email/password",
    "auth/wrong-password":"Invalid email/password"
}


const studentProfileSchema = {
    fullname:{
        type: "text",
        placeholder: "Enter full name",
        label: "Full name",
    },
    phoneNumber:{
        type: "tel",
        placeholder: "Enter phone number",
        label: "Phone number",
    },
    city:{
        type: "text",
        placeholder: "Enter residential city",
        label: "City",
    },
    country:{
        type: "text",
        placeholder: "Enter residential country",
        label: "Country",
    },
    cv:{
        type: "file",
        placeholder: "Enter link to CV",
        label: "CV/Resume",
    },
    sectors:{
        type: "text",
        placeholder: "Select sectors",
        label: "Sector",
    },
    schoolId:{
        type: "text",
        placeholder: "Select school",
        label: "School",
    },
    departmentId:{
        type: "text",
        placeholder: "Select department",
        label: "School Department",
    },
    
}

const superVisorProfileSchema = {
    fullname:{
        type: "text",
        placeholder: "Enter full name",
        label: "Full name",
    },
    email:{
        type: "email",
        placeholder: "Enter official email",
        label: "Official email",
    },
    schoolId:{
        type: "text",
        placeholder: "Select school",
        label: "School",
    },
    departmentId:{
        type: "text",
        placeholder: "Select department",
        label: "School Department",
    },
    
}

const organizationProfileSchema = {
    name:{
        type: "tel",
        placeholder: "Enter phone number",
        label: "Phone number",
    },
    address:{
        type: "text",
        placeholder: "Enter official address",
        label: "Official address",
    },
    city:{
        type: "text",
        placeholder: "Enter residential city",
        label: "City",
    },
    country:{
        type: "text",
        placeholder: "Enter residential country",
        label: "Country",
    },
    email:{
        type: "email",
        placeholder: "Enter official email",
        label: "Official email",
    },
    about:{
        type: "text",
        placeholder: "Enter short description about organization",
        label: "About organization",
        maxLength: 300,
        long: true,
    },
    website:{
        type: "url",
        placeholder: "Enter official website",
        label: "Official website",
    },
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

    static getCreateAccountSchema(){
        return {
            email: {
                type: "email",
                placeholder: "Enter your email address",
                label: "Email",
            },
            password: {
                type: "password",
                placeholder: "Enter your password",
                label: "Password",
            },
            confirmPassword: {
                type: "password",
                placeholder: "Enter your password",
                label: "Password",
            },
        }
    }

    static getAuthSchema(){
        return {
            email: {
                type: "email",
                placeholder: "Enter your email address",
                label: "Email",
            },
            password: {
                type: "password",
                placeholder: "Enter your password",
                label: "Password",
            },
        }
    }

    static getProfileSchema(type){

        if (type === userTypes.SUPERVISOR) return superVisorProfileSchema;
        if (type === userTypes.ORGANIZATION) return organizationProfileSchema;
        
        return studentProfileSchema;
    }

}


export {
    UserAccount,
}